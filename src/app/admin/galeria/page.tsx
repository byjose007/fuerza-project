import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import { GaleriaClientActions } from '@/components/admin/GaleriaClientActions';

export const dynamic = 'force-dynamic';

export default async function AdminGaleriaPage() {
    const supabase = await createClient();

    // Check auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return <div className="p-8">Acceso denegado.</div>;
    }

    // Fetch photos
    const { data: fotos, error } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error cargando galería:', error);
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-[var(--color-brand-magenta)] pb-2 inline-block">
                        Galería de Fotos
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Gestiona las imágenes oficiales del movimiento.
                    </p>
                </div>
                <Link
                    href="/admin/galeria/subir"
                    className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#9d1d52] transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Subir Fotos
                </Link>
            </div>

            {/* Empty State */}
            {(!fotos || fotos.length === 0) && (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center">
                    <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No hay fotos en la galería</h3>
                    <p className="text-gray-500 mb-6">Sube imágenes de recorridos, eventos y brigadas para mostrarlas al público.</p>
                    <Link
                        href="/admin/galeria/subir"
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Subir Primera Foto
                    </Link>
                </div>
            )}

            {/* Grid */}
            {fotos && fotos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fotos.map((foto: any) => (
                        <div key={foto.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                            {/* Imagen */}
                            <div className="relative aspect-video bg-gray-100 w-full overflow-hidden">
                                <img
                                    src={foto.url_imagen}
                                    alt={foto.titulo || "Foto"}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${foto.publicado ? 'bg-emerald-500/90 text-white border-emerald-400/50' : 'bg-amber-500/90 text-white border-amber-400/50'}`}>
                                        {foto.publicado ? 'Público' : 'Oculto'}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col gap-2">
                                <h3 className="font-bold text-gray-900 line-clamp-1" title={foto.titulo}>
                                    {foto.titulo}
                                </h3>
                                {foto.descripcion && (
                                    <p className="text-sm text-gray-500 line-clamp-2" title={foto.descripcion}>
                                        {foto.descripcion}
                                    </p>
                                )}
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                    <span className="text-xs text-gray-400 font-medium">
                                        {format(new Date(foto.created_at), "d MMMM yyyy", { locale: es })}
                                    </span>
                                    {/* Action Buttons */}
                                    <GaleriaClientActions
                                        id={foto.id}
                                        publicado={foto.publicado}
                                        urlImagen={foto.url_imagen}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
