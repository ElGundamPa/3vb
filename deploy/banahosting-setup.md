# Guía de Despliegue en Banahosting

## Requisitos Previos

1. **Plan Bana Professional Deluxe SSD Ultra** ✅
2. **Acceso SSH** al servidor
3. **Node.js 18.18+** instalado
4. **PM2** para gestión de procesos
5. **Nginx** como proxy reverso

## Configuración del Servidor

### 1. Instalar Node.js 18.18+

```bash
# Descargar e instalar Node.js
curl -fsSL https://nodejs.org/dist/v18.18.0/node-v18.18.0-linux-x64.tar.xz -o node.tar.xz
tar -xf node.tar.xz
sudo mv node-v18.18.0-linux-x64 /opt/nodejs
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm
```

### 2. Instalar PM2

```bash
npm install -g pm2
```

### 3. Configurar Nginx

Crear archivo `/etc/nginx/sites-available/3vb.legal`:

```nginx
server {
    listen 80;
    server_name 3vb.legal www.3vb.legal;
    
    # Redireccionar HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name 3vb.legal www.3vb.legal;
    
    # SSL Configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Static files
    location /static/ {
        alias /var/www/3vb.legal/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Configurar PM2

Crear archivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: '3vb-legal',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/3vb.legal',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/3vb-legal-error.log',
    out_file: '/var/log/pm2/3vb-legal-out.log',
    log_file: '/var/log/pm2/3vb-legal.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
}
```

## Proceso de Despliegue

### 1. Preparar el Proyecto

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/3vb-legal.git
cd 3vb-legal

# Instalar dependencias
npm ci --production

# Construir la aplicación
npm run build
```

### 2. Configurar Variables de Entorno

Crear archivo `.env.production`:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://3vb.legal
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
DATABASE_URL=postgresql://user:password@localhost:5432/3vb_legal
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### 3. Desplegar con PM2

```bash
# Iniciar la aplicación
pm2 start ecosystem.config.js --env production

# Configurar PM2 para iniciar automáticamente
pm2 startup
pm2 save

# Verificar el estado
pm2 status
pm2 logs 3vb-legal
```

### 4. Configurar Nginx

```bash
# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/3vb.legal /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## Monitoreo y Mantenimiento

### 1. Monitoreo de PM2

```bash
# Ver logs en tiempo real
pm2 logs 3vb-legal --lines 100

# Reiniciar aplicación
pm2 restart 3vb-legal

# Recargar aplicación (sin downtime)
pm2 reload 3vb-legal

# Ver métricas
pm2 monit
```

### 2. Monitoreo del Sistema

```bash
# Ver uso de memoria
free -h

# Ver uso de CPU
top

# Ver espacio en disco
df -h

# Ver logs del sistema
journalctl -u nginx
```

### 3. Backup Automático

Crear script `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/3vb-legal"
APP_DIR="/var/www/3vb.legal"

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup de la aplicación
tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C $APP_DIR .

# Backup de la base de datos (si aplica)
# pg_dump 3vb_legal > $BACKUP_DIR/db_$DATE.sql

# Limpiar backups antiguos (mantener 7 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

### 4. Actualización de la Aplicación

```bash
# Script de actualización
#!/bin/bash
cd /var/www/3vb.legal

# Backup actual
./backup.sh

# Pull cambios
git pull origin main

# Instalar dependencias
npm ci --production

# Construir aplicación
npm run build

# Recargar PM2
pm2 reload 3vb-legal

# Verificar estado
pm2 status
```

## Optimizaciones de Rendimiento

### 1. Configuración de Nginx

```nginx
# En el bloque server
client_max_body_size 10M;
client_body_timeout 60s;
client_header_timeout 60s;
keepalive_timeout 65s;
send_timeout 60s;

# Buffer sizes
client_body_buffer_size 128k;
client_header_buffer_size 1k;
large_client_header_buffers 4 4k;
```

### 2. Configuración de PM2

```javascript
// En ecosystem.config.js
max_memory_restart: '1G',
min_uptime: '10s',
max_restarts: 10,
restart_delay: 4000,
```

### 3. Variables de Entorno de Rendimiento

```env
# Node.js optimizations
NODE_OPTIONS="--max-old-space-size=1024"
UV_THREADPOOL_SIZE=4

# Next.js optimizations
NEXT_TELEMETRY_DISABLED=1
```

## Troubleshooting

### Problemas Comunes

1. **Error de memoria**: Aumentar `max_memory_restart` en PM2
2. **Error de puerto**: Verificar que el puerto 3000 esté libre
3. **Error de SSL**: Verificar certificados SSL
4. **Error de permisos**: Verificar permisos de archivos

### Comandos de Diagnóstico

```bash
# Verificar puertos
netstat -tlnp | grep :3000

# Verificar procesos
ps aux | grep node

# Verificar logs
tail -f /var/log/nginx/error.log
tail -f /var/log/pm2/3vb-legal-error.log
```

## Checklist de Despliegue

- [ ] Node.js 18.18+ instalado
- [ ] PM2 instalado y configurado
- [ ] Nginx configurado y funcionando
- [ ] SSL configurado
- [ ] Variables de entorno configuradas
- [ ] Aplicación construida y funcionando
- [ ] Monitoreo configurado
- [ ] Backup automático configurado
- [ ] Scripts de actualización listos
- [ ] Pruebas de carga realizadas
