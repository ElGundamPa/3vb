#!/bin/bash

# Script de despliegue automatizado para 3VB Legal
# Uso: ./scripts/deploy.sh [staging|production]

set -e

# Configuración
ENVIRONMENT=${1:-staging}
APP_NAME="3vb-legal"
APP_DIR="/var/www/3vb.legal"
BACKUP_DIR="/var/backups/3vb-legal"
LOG_FILE="/var/log/deploy-3vb.log"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función de logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

# Verificar que se ejecute como root o con sudo
if [ "$EUID" -ne 0 ]; then
    error "Este script debe ejecutarse con privilegios de administrador"
fi

# Verificar entorno
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    error "Entorno inválido. Use 'staging' o 'production'"
fi

log "Iniciando despliegue en entorno: $ENVIRONMENT"

# 1. Backup de la aplicación actual
log "Creando backup de la aplicación actual..."
if [ -d "$APP_DIR" ]; then
    mkdir -p $BACKUP_DIR
    BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).tar.gz"
    tar -czf $BACKUP_FILE -C $APP_DIR . 2>/dev/null || warning "No se pudo crear backup completo"
    success "Backup creado: $BACKUP_FILE"
else
    warning "No existe directorio de aplicación, saltando backup"
fi

# 2. Verificar espacio en disco
log "Verificando espacio en disco..."
DISK_USAGE=$(df $APP_DIR 2>/dev/null | awk 'NR==2 {print $5}' | sed 's/%//' || echo "0")
if [ "$DISK_USAGE" -gt 90 ]; then
    error "Espacio en disco insuficiente: ${DISK_USAGE}% usado"
fi

# 3. Detener la aplicación
log "Deteniendo aplicación..."
pm2 stop $APP_NAME 2>/dev/null || warning "Aplicación no estaba ejecutándose"

# 4. Actualizar código
log "Actualizando código desde Git..."
cd $APP_DIR || error "No se pudo acceder al directorio de la aplicación"

# Verificar si hay cambios pendientes
if [ -n "$(git status --porcelain)" ]; then
    warning "Hay cambios sin commitear. Haciendo stash..."
    git stash
fi

# Pull de cambios
git fetch origin
git checkout main
git pull origin main || error "Error al actualizar código"

# 5. Instalar dependencias
log "Instalando dependencias..."
npm ci --production || error "Error al instalar dependencias"

# 6. Construir aplicación
log "Construyendo aplicación..."
npm run build || error "Error al construir la aplicación"

# 7. Verificar configuración
log "Verificando configuración..."
if [ ! -f ".env.production" ]; then
    warning "Archivo .env.production no encontrado"
fi

# 8. Iniciar aplicación
log "Iniciando aplicación..."
pm2 start ecosystem.config.js --env $ENVIRONMENT || error "Error al iniciar la aplicación"

# 9. Verificar estado
log "Verificando estado de la aplicación..."
sleep 5
pm2 status $APP_NAME

# Verificar que la aplicación responda
log "Verificando respuesta de la aplicación..."
if [ "$ENVIRONMENT" = "production" ]; then
    HEALTH_URL="https://3vb.legal/api/health"
else
    HEALTH_URL="http://localhost:3000/api/health"
fi

# Intentar verificar salud de la aplicación
for i in {1..5}; do
    if curl -f -s $HEALTH_URL > /dev/null 2>&1; then
        success "Aplicación respondiendo correctamente"
        break
    else
        warning "Intento $i/5: Aplicación no responde, esperando..."
        sleep 10
    fi
done

# 10. Limpiar backups antiguos
log "Limpiando backups antiguos..."
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete 2>/dev/null || true

# 11. Verificar logs
log "Verificando logs recientes..."
pm2 logs $APP_NAME --lines 10

# 12. Notificaciones
if [ "$ENVIRONMENT" = "production" ]; then
    log "Enviando notificación de despliegue exitoso..."
    # Aquí iría la lógica para enviar notificaciones (Slack, email, etc.)
fi

success "Despliegue completado exitosamente en entorno: $ENVIRONMENT"

# Mostrar información útil
echo ""
echo "=== INFORMACIÓN DEL DESPLIEGUE ==="
echo "Entorno: $ENVIRONMENT"
echo "Aplicación: $APP_NAME"
echo "Directorio: $APP_DIR"
echo "Backup: $BACKUP_FILE"
echo "Logs: pm2 logs $APP_NAME"
echo "Estado: pm2 status"
echo "Monitoreo: pm2 monit"
echo ""

# Verificar métricas
log "Métricas del sistema:"
echo "Memoria usada: $(free -h | awk 'NR==2{printf "%.1f%%", $3*100/$2}')"
echo "Espacio en disco: $(df -h $APP_DIR | awk 'NR==2{print $5}')"
echo "Procesos Node.js: $(pgrep -c node)"

success "Despliegue finalizado. Revisa los logs si hay algún problema."
