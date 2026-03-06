import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Users, Eye, EyeOff, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { DirectivaClientActions } from '@/components/admin/DirectivaClientActions';

export const dynamic = 'force-dynamic';

export default async function AdminDirectivaPage() {
    const supabase = await createClient();

    // Check auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return <div className="p-8">Acceso denegado.</div>;
    }

    // Fetch members ordered by 'orden'
    const { data: miembros, error } = await supabase
        .from('directiva')
        .select('*')
        .order('orden', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error cargando directiva:', error);
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-[var(--color-brand-magenta)] pb-2 inline-block flex items-center gap-3">
                        <Users className="w-8 h-8 text-[var(--color-brand-magenta)]" />
                        Directiva Provincial
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Gestiona los miembros del equipo de liderazgo que se muestran públicamente.
                    </p>
                </div>
                <Link
                    href="/admin/directiva/nuevo"
                    className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#9d1d52] transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Agregar Miembro
                </Link>
            </div>

            {/* Empty State */}
            {(!miembros || miembros.length === 0) && (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center">
                    <Users className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aún no hay miembros registrados</h3>
                    <p className="text-gray-500 mb-6">Añade a los líderes provinciales y cantonales para que la gente los conozca.</p>
                    <Link
                        href="/admin/directiva/nuevo"
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Registrar Primer Miembro
                    </Link>
                </div>
            )}

            {/* Grid */}
            {miembros && miembros.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {miembros.map((miembro) => (
                        <div key={miembro.id} className={`bg-white rounded-2xl border ${miembro.activo ? 'border-gray-100 shadow-sm' : 'border-dashed border-gray-300 opacity-70'} overflow-hidden group flex flex-col`}>
                            {/* Profile Image */}
                            <div className="relative aspect-[3/4] bg-gray-50 w-full overflow-hidden flex items-center justify-center border-b border-gray-100">
                                {miembro.url_foto ? (
                                    <img
                                        src={miembro.url_foto}
                                        alt={miembro.nombre}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <Users className="w-20 h-20 text-gray-300" />
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${miembro.activo ? 'bg-emerald-500/90 text-white border-emerald-400/50' : 'bg-amber-500/90 text-white border-amber-400/50'}`}>
                                        {miembro.activo ? 'Activo' : 'Oculto'}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-gray-900 line-clamp-1" title={miembro.nombre}>
                                    {miembro.nombre}
                                </h3>
                                <p className="text-[var(--color-brand-magenta)] font-medium text-sm mb-2" title={miembro.cargo}>
                                    {miembro.cargo}
                                </p>

                                {miembro.descripcion && (
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                                        {miembro.descripcion}
                                    </p>
                                )}

                                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-md">
                                        Orden: {miembro.orden}
                                    </span>
                                    {/* Action Buttons */}
                                    <DirectivaClientActions
                                        id={miembro.id}
                                        activo={miembro.activo}
                                        urlFoto={miembro.url_foto}
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
