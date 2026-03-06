import { createClient } from '@/lib/supabase/server';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { AjustesForm } from '@/components/admin/AjustesForm';

export const dynamic = 'force-dynamic';

export default async function AdminAjustesPage() {
    const supabase = await createClient();

    // Check auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return <div className="p-8">Acceso denegado.</div>;
    }

    // Fetch site settings
    const { data: settings, error } = await supabase
        .from('site_settings')
        .select('*');

    if (error) {
        console.error('Error cargando ajustes:', error);
    }

    // Transform array of objects to key-value map for the form
    const settingsMap = settings?.reduce((acc: Record<string, string>, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {}) || {};

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-[var(--color-brand-magenta)] pb-2 inline-block flex items-center gap-3">
                    <Settings className="w-8 h-8 text-[var(--color-brand-magenta)]" />
                    Ajustes del Sitio Público
                </h1>
                <p className="mt-2 text-gray-600">
                    Modifica los textos y la visibilidad de las secciones principales del sitio web. Los cambios se reflejarán instantáneamente para todos los visitantes.
                </p>
            </div>

            <AjustesForm initialSettings={settingsMap} />
        </div>
    );
}
