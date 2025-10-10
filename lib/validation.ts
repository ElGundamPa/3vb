import { z } from 'zod'

// Esquemas de validación para formularios
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  email: z.string()
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Formato de teléfono inválido'),
  
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  
  message: z.string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  
  amountLost: z.number()
    .min(0, 'El monto no puede ser negativo')
    .max(1000000, 'El monto no puede exceder $1,000,000'),
  
  caseType: z.enum(['ciberfraude', 'estafa', 'phishing', 'otro'], {
    errorMap: () => ({ message: 'Selecciona un tipo de caso válido' })
  }),
  
  urgency: z.enum(['baja', 'media', 'alta'], {
    errorMap: () => ({ message: 'Selecciona un nivel de urgencia' })
  }),
  
  consent: z.boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones'),
  
  privacy: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad')
})

export const appointmentFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  email: z.string()
    .email('Debe ser un email válido'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Formato de teléfono inválido'),
  
  preferredDate: z.string()
    .min(1, 'Selecciona una fecha'),
  
  preferredTime: z.string()
    .min(1, 'Selecciona una hora'),
  
  serviceType: z.string()
    .min(1, 'Selecciona un tipo de servicio'),
  
  caseDescription: z.string()
    .min(50, 'La descripción debe tener al menos 50 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  urgency: z.enum(['baja', 'media', 'alta']),
  
  consent: z.boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones')
})

export const newsletterSchema = z.object({
  email: z.string()
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  interests: z.array(z.string())
    .min(1, 'Selecciona al menos un interés')
    .max(5, 'No puedes seleccionar más de 5 intereses'),
  
  consent: z.boolean()
    .refine(val => val === true, 'Debes aceptar recibir comunicaciones')
})

// Validación de archivos
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'El archivo no puede exceder 10MB')
    .refine(file => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      return allowedTypes.includes(file.type)
    }, 'Tipo de archivo no permitido')
})

// Validación de búsqueda
export const searchSchema = z.object({
  query: z.string()
    .min(2, 'La búsqueda debe tener al menos 2 caracteres')
    .max(100, 'La búsqueda no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/, 'La búsqueda contiene caracteres no válidos'),
  
  category: z.enum(['servicios', 'abogados', 'casos', 'todos']).optional(),
  
  location: z.string().optional()
})

// Validación de pagos
export const paymentSchema = z.object({
  amount: z.number()
    .min(1, 'El monto debe ser mayor a 0')
    .max(100000, 'El monto no puede exceder $100,000'),
  
  currency: z.enum(['USD', 'MXN', 'PEN']),
  
  paymentMethod: z.enum(['card', 'bank_transfer', 'crypto']),
  
  billingAddress: z.object({
    street: z.string().min(5).max(100),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    postalCode: z.string().min(3).max(10),
    country: z.string().min(2).max(50)
  }),
  
  cardDetails: z.object({
    number: z.string().regex(/^[0-9]{13,19}$/, 'Número de tarjeta inválido'),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^[0-9]{3,4}$/, 'CVV inválido')
  }).optional()
})

// Funciones de validación personalizadas
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/
  return phoneRegex.test(phone)
}

export const validateAmount = (amount: number): boolean => {
  return amount >= 0 && amount <= 1000000
}

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

// Rate limiting
export const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export const checkRateLimit = (ip: string, limit: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now()
  const key = ip
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Sanitización de datos
export const sanitizeFormData = (data: Record<string, unknown>): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'number') {
      sanitized[key] = Math.max(0, value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      )
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}
