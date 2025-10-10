"use client";

// Tipos de eventos de seguridad
export type SecurityEvent = 
  | 'login_attempt'
  | 'login_success'
  | 'login_failure'
  | 'form_submission'
  | 'file_upload'
  | 'suspicious_activity'
  | 'rate_limit_exceeded'
  | 'invalid_input'
  | 'csrf_attempt'
  | 'xss_attempt'
  | 'sql_injection_attempt'

export interface SecurityLog {
  timestamp: string
  event: SecurityEvent
  severity: 'low' | 'medium' | 'high' | 'critical'
  ip: string
  userAgent: string
  url: string
  details: Record<string, unknown>
  userId?: string
  sessionId?: string
}

// Configuración de seguridad
export const securityConfig = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutos
  rateLimitWindow: 60 * 1000, // 1 minuto
  maxRequestsPerWindow: 100,
  suspiciousPatterns: [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /exec\s*\(/i,
    /eval\s*\(/i
  ]
}

// Detectar patrones sospechosos
export const detectSuspiciousActivity = (input: string): boolean => {
  return securityConfig.suspiciousPatterns.some(pattern => pattern.test(input))
}

// Log de eventos de seguridad
export const logSecurityEvent = (event: SecurityLog): void => {
  // En producción, esto se enviaría a un servicio de logging
  if (typeof window !== 'undefined') {
    console.warn('Security Event:', event)
    
    // Enviar a servicio de monitoreo (ej: Sentry, LogRocket)
    if (window.gtag) {
      window.gtag('event', 'security_event', {
        event_category: 'security',
        event_label: event.event,
        value: event.severity === 'critical' ? 4 : 
               event.severity === 'high' ? 3 :
               event.severity === 'medium' ? 2 : 1
      })
    }
  }
}

// Detectar intentos de XSS
export const detectXSS = (input: string): boolean => {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>.*?<\/embed>/gi,
    /<link[^>]*>.*?<\/link>/gi,
    /<meta[^>]*>.*?<\/meta>/gi,
    /<style[^>]*>.*?<\/style>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi,
    /onclick\s*=/gi,
    /onmouseover\s*=/gi,
    /onfocus\s*=/gi,
    /onblur\s*=/gi,
    /onchange\s*=/gi,
    /onsubmit\s*=/gi,
    /onreset\s*=/gi,
    /onselect\s*=/gi,
    /onkeydown\s*=/gi,
    /onkeyup\s*=/gi,
    /onkeypress\s*=/gi
  ]
  
  return xssPatterns.some(pattern => pattern.test(input))
}

// Detectar intentos de SQL Injection
export const detectSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /union\s+select/gi,
    /drop\s+table/gi,
    /insert\s+into/gi,
    /delete\s+from/gi,
    /update\s+set/gi,
    /create\s+table/gi,
    /alter\s+table/gi,
    /exec\s*\(/gi,
    /execute\s*\(/gi,
    /sp_/gi,
    /xp_/gi,
    /--/gi,
    /\/\*/gi,
    /\*\//gi,
    /waitfor\s+delay/gi,
    /benchmark\s*\(/gi,
    /sleep\s*\(/gi,
    /load_file\s*\(/gi,
    /into\s+outfile/gi,
    /into\s+dumpfile/gi
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

// Detectar intentos de CSRF
export const detectCSRF = (referer: string, origin: string): boolean => {
  if (!referer || !origin) return true
  
  try {
    const refererUrl = new URL(referer)
    const originUrl = new URL(origin)
    
    return refererUrl.hostname !== originUrl.hostname
  } catch {
    return true
  }
}

// Validar token CSRF
export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  if (!token || !sessionToken) return false
  
  // Implementación básica - en producción usar crypto.secureCompare
  return token === sessionToken
}

// Generar token CSRF
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Sanitizar entrada del usuario
export const sanitizeUserInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[;\\]/g, '') // Remove semicolons and backslashes
    .trim()
}

// Validar IP
export const isValidIP = (ip: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

// Obtener IP del cliente
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('x-remote-addr')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (remoteAddr) {
    return remoteAddr
  }
  
  return 'unknown'
}

// Rate limiting por IP
export const rateLimitByIP = new Map<string, { count: number; resetTime: number }>()

export const checkIPRateLimit = (ip: string): boolean => {
  const now = Date.now()
  const record = rateLimitByIP.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitByIP.set(ip, { count: 1, resetTime: now + securityConfig.rateLimitWindow })
    return true
  }
  
  if (record.count >= securityConfig.maxRequestsPerWindow) {
    return false
  }
  
  record.count++
  return true
}

// Detectar bots maliciosos
export const detectMaliciousBot = (userAgent: string): boolean => {
  const maliciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
    /burp/i,
    /w3af/i,
    /havij/i,
    /acunetix/i,
    /nessus/i,
    /openvas/i,
    /metasploit/i,
    /crawler/i,
    /spider/i,
    /bot/i,
    /scraper/i,
    /harvester/i,
    /extractor/i
  ]
  
  return maliciousPatterns.some(pattern => pattern.test(userAgent))
}

// Monitoreo de seguridad en tiempo real
export const securityMonitor = {
  logEvent: (event: SecurityEvent, details: Record<string, unknown>, severity: SecurityLog['severity'] = 'medium') => {
    const log: SecurityLog = {
      timestamp: new Date().toISOString(),
      event,
      severity,
      ip: 'client-ip', // Se obtendría del request
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      details,
      userId: 'anonymous', // Se obtendría de la sesión
      sessionId: 'session-id' // Se obtendría de la sesión
    }
    
    logSecurityEvent(log)
  },
  
  alert: (message: string, severity: SecurityLog['severity'] = 'high') => {
    console.error(`Security Alert [${severity.toUpperCase()}]:`, message)
    
    // En producción, enviar alerta a administradores
    if (severity === 'critical' || severity === 'high') {
      // Enviar notificación a Slack, email, etc.
    }
  }
}
