import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// We use the service role key to bypass RLS and aggregate data securely.
// We only expose aggregate counts (anonymized), never PII.

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        if (!url || !key) throw new Error('Missing Supabase configuration')

        const supabase = createClient(url, key)

        // Usar la función RPC 'get_canton_metrics' 
        // Esta función retorna un agrupado seguro (canton, count) sin exponer PII
        const { data, error } = await supabase.rpc('get_canton_metrics')

        if (error) throw error

        const counts: Record<string, number> = {}
        if (data && Array.isArray(data)) {
            data.forEach((row: { canton: string, count: string | number }) => {
                if (row.canton) {
                    counts[row.canton] = Number(row.count)
                }
            })
        }

        return NextResponse.json({ success: true, data: counts })
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
