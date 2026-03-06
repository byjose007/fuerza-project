import { createClient } from '@/lib/supabase/server';
import GaleriaClient from '@/components/GaleriaClient';
import { Image as ImageIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galería de Fotos | Movimiento FUERZA',
    description: 'Explora nuestra galería de imágenes oficiales: recorridos, asambleas y actividades del movimiento en Zamora Chinchipe.',
};

export const revalidate = 60; // Revalidate every minute

export default async function GaleriaPage() {
    const supabase = await createClient();

    // Fetch ONLY published photos, ordered newest first
    const { data: fotos, error } = await supabase
        .from('galeria')
        .select('*')
        .eq('publicado', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching galeria:', error);
    }

    return (
        <div className="min-h-[80vh] flex flex-col bg-white pt-24 pb-20">
            {/* Header / Hero */}
            <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-magenta)]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-brand-green)]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                        <ImageIcon className="w-8 h-8 text-[var(--color-brand-magenta)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Galería <span className="text-[var(--color-brand-magenta)]">Oficial</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Un recorrido visual por el trabajo ciudadano, asambleas parroquiales y el crecimiento continuo de nuestro movimiento en toda la provincia de Zamora Chinchipe.
                    </p>
                </div>
            </div>

            {/* Gallery Grid Container */}
            <div className="container mx-auto px-4 py-16 flex-grow">
                <GaleriaClient fotos={fotos || []} />
            </div>
        </div>
    );
}
