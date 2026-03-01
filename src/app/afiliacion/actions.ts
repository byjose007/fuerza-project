'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitAfiliacion(formData: FormData) {
    const supabase = await createClient()

    // Validación básica del Cloudflare Turnstile o ReCaptcha
    // TODO: Integrar con llaves reales de Cloudflare
    const token = formData.get('cf-turnstile-response')
    if (!token && process.env.NEXT_PUBLIC_REQUIRE_CAPTCHA === 'true') {
        return { error: 'Verificación de seguridad fallida. Eres un bot?' }
    }

    // Extraer datos
    const data = {
        nombres: formData.get('nombres') as string,
        apellidos: formData.get('apellidos') as string,
        cedula: formData.get('cedula') as string,
        fecha_nacimiento: formData.get('fecha_nacimiento') as string,
        residencia: formData.get('residencia') as string,
        canton: formData.get('canton') as string,
        parroquia: formData.get('parroquia') as string,
        email: formData.get('email') as string,
        telefono: formData.get('telefono') as string,
        es_permanente: formData.get('es_permanente') === 'on',
        acepta_principios: formData.get('acepta_principios') === 'on',
        no_pertenece_movimiento: formData.get('no_pertenece_movimiento') === 'on',
        consentimiento_datos: formData.get('consentimiento_datos') === 'on',
    }

    // Validaciones del servidor
    if (!data.nombres || !data.apellidos || !data.cedula || !data.fecha_nacimiento) {
        return { error: 'Faltan campos obligatorios' }
    }
    if (!data.acepta_principios || !data.no_pertenece_movimiento || !data.consentimiento_datos) {
        return { error: 'Debe aceptar todas las declaraciones legales del CNE y LOPDP' }
    }

    const { error } = await supabase
        .from('afiliados')
        .insert([data])

    if (error) {
        console.error('Submit error:', error)
        if (error.code === '23505') return { error: 'Esta cédula ya se encuentra registrada en nuestra base de datos.' }
        return { error: 'Ocurrió un error al procesar la solicitud. ' + error.message }
    }

    revalidatePath('/afiliacion')
    return { success: true }
}
