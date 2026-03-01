import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Este endpoint se ejecuta automáticamente via Vercel Cron cada 5 días
// para evitar que Supabase (plan gratuito) pause el proyecto por inactividad.
// No modifica ni inserta datos — solo hace un SELECT ligero.

export async function GET(request: Request) {
    // Verificar que la llamada viene del cron de Vercel (seguridad)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // En desarrollo o sin secret configurado, permitir igualmente
        if (process.env.NODE_ENV === 'production' && process.env.CRON_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }

    try {
        const supabase = await createClient()

        // Query liviana: solo verifica que la conexión está activa
        const { count, error } = await supabase
            .from('afiliados')
            .select('*', { count: 'exact', head: true })

        if (error) {
            return NextResponse.json({
                status: 'error',
                message: error.message,
                timestamp: new Date().toISOString(),
            }, { status: 500 })
        }

        return NextResponse.json({
            status: 'ok',
            message: 'Supabase is alive',
            afiliados: count,
            timestamp: new Date().toISOString(),
        })
    } catch (err) {
        return NextResponse.json({
            status: 'error',
            message: 'Connection failed',
            timestamp: new Date().toISOString(),
        }, { status: 500 })
    }
}
