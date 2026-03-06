import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export async function GET() {
    const supabase = await createClient();

    // 1. Verify Admin Session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        // 2. Fetch all adherents
        const { data: afiliados, error } = await supabase
            .from('afiliados')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!afiliados || afiliados.length === 0) {
            return new Response('No hay datos para exportar', { status: 404 });
        }

        // 3. Generate CSV Content
        // Define Headers
        const headers = [
            'ID',
            'Nombres',
            'Apellidos',
            'Cédula',
            'Fecha Nacimiento',
            'Género',
            'Provincia',
            'Cantón',
            'Parroquia',
            'Dirección',
            'Teléfono',
            'Email',
            'Fecha de Registro',
            'Consentimiento Datos',
            'Consentimiento IDE'
        ];

        // Escape helper for CSV cells
        const escapeCsv = (str: string | null | undefined) => {
            if (str === null || str === undefined) return '""';
            const stringified = String(str);
            if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n')) {
                return `"${stringified.replace(/"/g, '""')}"`;
            }
            return stringified;
        };

        const rows = afiliados.map(a => [
            escapeCsv(a.id),
            escapeCsv(a.nombres),
            escapeCsv(a.apellidos),
            escapeCsv(a.cedula),
            a.fecha_nacimiento ? format(new Date(a.fecha_nacimiento), 'dd/MM/yyyy') : '',
            escapeCsv(a.genero),
            escapeCsv(a.provincia),
            escapeCsv(a.canton),
            escapeCsv(a.parroquia),
            escapeCsv(a.direccion),
            escapeCsv(a.telefono),
            escapeCsv(a.email),
            a.created_at ? format(new Date(a.created_at), 'dd/MM/yyyy HH:mm:ss') : '',
            a.consentimiento_datos ? 'Sí' : 'No',
            a.consentimiento_ide ? 'Sí' : 'No'
        ].join(','));

        const csvContent = [headers.join(','), ...rows].join('\n');

        // Add BOM for Excel UTF-8 display compatibility
        const bom = '\uFEFF';
        const finalCsv = bom + csvContent;

        // 4. Return as downloadable file
        const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
        const filename = `Fuerza_Afiliados_${timestamp}.csv`;

        return new Response(finalCsv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

    } catch (error: any) {
        console.error('Error generating CSV:', error);
        return new Response('Error interno generando CSV', { status: 500 });
    }
}
