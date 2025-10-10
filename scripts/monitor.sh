#!/bin/bash

# Script de monitoreo para 3VB Legal
# Uso: ./scripts/monitor.sh [check|alert|report]

set -e

# Configuración
APP_NAME="3vb-legal"
LOG_FILE="/var/log/monitor-3vb.log"
ALERT_EMAIL="admin@3vb.legal"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Función de logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

# Función para enviar alertas
send_alert() {
    local message="$1"
    local severity="$2"
    
    log "ALERTA [$severity]: $message"
    
    # Enviar a Slack
    if [ -n "$SLACK_WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚨 3VB Legal Alert [$severity]: $message\"}" \
            $SLACK_WEBHOOK 2>/dev/null || true
    fi
    
    # Enviar email (requiere mailutils)
    if command -v mail >/dev/null 2>&1; then
        echo "$message" | mail -s "3VB Legal Alert [$severity]" $ALERT_EMAIL 2>/dev/null || true
    fi
}

# Verificar estado de la aplicación
check_app_status() {
    log "Verificando estado de la aplicación..."
    
    # Verificar PM2
    if ! pm2 describe $APP_NAME >/dev/null 2>&1; then
        send_alert "Aplicación no está ejecutándose en PM2" "CRITICAL"
        return 1
    fi
    
    # Verificar estado
    local status=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .pm2_env.status")
    if [ "$status" != "online" ]; then
        send_alert "Aplicación no está online. Estado: $status" "CRITICAL"
        return 1
    fi
    
    # Verificar respuesta HTTP
    local response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health 2>/dev/null || echo "000")
    if [ "$response" != "200" ]; then
        send_alert "Aplicación no responde correctamente. HTTP: $response" "HIGH"
        return 1
    fi
    
    log "Aplicación funcionando correctamente"
    return 0
}

# Verificar uso de memoria
check_memory() {
    log "Verificando uso de memoria..."
    
    local memory_usage=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .monit.memory")
    local memory_mb=$((memory_usage / 1024 / 1024))
    
    if [ $memory_mb -gt 1024 ]; then
        send_alert "Uso de memoria alto: ${memory_mb}MB" "HIGH"
        return 1
    fi
    
    log "Uso de memoria normal: ${memory_mb}MB"
    return 0
}

# Verificar uso de CPU
check_cpu() {
    log "Verificando uso de CPU..."
    
    local cpu_usage=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .monit.cpu")
    
    if [ $(echo "$cpu_usage > 80" | bc -l) -eq 1 ]; then
        send_alert "Uso de CPU alto: ${cpu_usage}%" "MEDIUM"
        return 1
    fi
    
    log "Uso de CPU normal: ${cpu_usage}%"
    return 0
}

# Verificar espacio en disco
check_disk() {
    log "Verificando espacio en disco..."
    
    local disk_usage=$(df /var/www/3vb.legal | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ $disk_usage -gt 90 ]; then
        send_alert "Espacio en disco bajo: ${disk_usage}%" "CRITICAL"
        return 1
    fi
    
    log "Espacio en disco normal: ${disk_usage}%"
    return 0
}

# Verificar logs de errores
check_error_logs() {
    log "Verificando logs de errores..."
    
    local error_count=$(pm2 logs $APP_NAME --err --lines 100 | grep -c "ERROR\|FATAL" || echo "0")
    
    if [ $error_count -gt 10 ]; then
        send_alert "Muchos errores en logs: $error_count errores en las últimas 100 líneas" "MEDIUM"
        return 1
    fi
    
    log "Logs de errores normales: $error_count errores"
    return 0
}

# Verificar conectividad de red
check_network() {
    log "Verificando conectividad de red..."
    
    # Verificar DNS
    if ! nslookup 3vb.legal >/dev/null 2>&1; then
        send_alert "Problema de resolución DNS" "HIGH"
        return 1
    fi
    
    # Verificar conectividad externa
    if ! curl -s --connect-timeout 10 https://www.google.com >/dev/null 2>&1; then
        send_alert "Problema de conectividad externa" "MEDIUM"
        return 1
    fi
    
    log "Conectividad de red normal"
    return 0
}

# Verificar certificados SSL
check_ssl() {
    log "Verificando certificados SSL..."
    
    local cert_expiry=$(echo | openssl s_client -servername 3vb.legal -connect 3vb.legal:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    local cert_date=$(date -d "$cert_expiry" +%s)
    local current_date=$(date +%s)
    local days_until_expiry=$(( (cert_date - current_date) / 86400 ))
    
    if [ $days_until_expiry -lt 30 ]; then
        send_alert "Certificado SSL expira en $days_until_expiry días" "HIGH"
        return 1
    fi
    
    log "Certificado SSL válido por $days_until_expiry días"
    return 0
}

# Generar reporte de estado
generate_report() {
    log "Generando reporte de estado..."
    
    local report_file="/tmp/3vb-status-report-$(date +%Y%m%d-%H%M%S).txt"
    
    {
        echo "=== REPORTE DE ESTADO 3VB LEGAL ==="
        echo "Fecha: $(date)"
        echo "Servidor: $(hostname)"
        echo ""
        
        echo "=== ESTADO DE LA APLICACIÓN ==="
        pm2 status $APP_NAME
        echo ""
        
        echo "=== MÉTRICAS DEL SISTEMA ==="
        echo "Memoria:"
        free -h
        echo ""
        echo "Disco:"
        df -h
        echo ""
        echo "CPU:"
        top -bn1 | grep "Cpu(s)"
        echo ""
        
        echo "=== LOGS RECIENTES ==="
        pm2 logs $APP_NAME --lines 20
        echo ""
        
        echo "=== CONECTIVIDAD ==="
        echo "DNS:"
        nslookup 3vb.legal
        echo ""
        echo "HTTP Response:"
        curl -I https://3vb.legal 2>/dev/null || echo "Error de conectividad"
        
    } > $report_file
    
    log "Reporte generado: $report_file"
    echo $report_file
}

# Función principal de monitoreo
monitor() {
    local issues=0
    
    log "Iniciando monitoreo completo..."
    
    check_app_status || ((issues++))
    check_memory || ((issues++))
    check_cpu || ((issues++))
    check_disk || ((issues++))
    check_error_logs || ((issues++))
    check_network || ((issues++))
    check_ssl || ((issues++))
    
    if [ $issues -eq 0 ]; then
        log "✅ Todos los checks pasaron correctamente"
    else
        log "❌ Se encontraron $issues problemas"
    fi
    
    return $issues
}

# Función de alertas
alert() {
    log "Verificando alertas críticas..."
    
    # Verificar si la aplicación está caída
    if ! pm2 describe $APP_NAME >/dev/null 2>&1; then
        send_alert "🚨 APLICACIÓN CAÍDA - Intervención inmediata requerida" "CRITICAL"
        return 1
    fi
    
    # Verificar memoria crítica
    local memory_usage=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .monit.memory")
    local memory_mb=$((memory_usage / 1024 / 1024))
    
    if [ $memory_mb -gt 1500 ]; then
        send_alert "🚨 MEMORIA CRÍTICA - ${memory_mb}MB usado" "CRITICAL"
        return 1
    fi
    
    # Verificar espacio en disco crítico
    local disk_usage=$(df /var/www/3vb.legal | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $disk_usage -gt 95 ]; then
        send_alert "🚨 DISCO CRÍTICO - ${disk_usage}% usado" "CRITICAL"
        return 1
    fi
    
    log "No hay alertas críticas"
    return 0
}

# Función de reporte
report() {
    log "Generando reporte completo..."
    generate_report
}

# Main
case "${1:-check}" in
    "check")
        monitor
        ;;
    "alert")
        alert
        ;;
    "report")
        report
        ;;
    *)
        echo "Uso: $0 [check|alert|report]"
        echo "  check  - Verificar estado completo"
        echo "  alert  - Verificar solo alertas críticas"
        echo "  report - Generar reporte de estado"
        exit 1
        ;;
esac
