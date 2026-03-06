'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { ArrowLeft, UserPlus, CheckCircle2, User as UserIcon, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function NuevoMiembroPage() {
    const router = useRouter();
    const supabase = createClient();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        cargo: '',
        descripcion: '',
        orden: 0,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            if (selected.size > 5 * 1024 * 1024) {
                setError('La imagen es demasiado grande. Máximo 5MB.');
                return;
            }
            if (!selected.type.startsWith('image/')) {
                setError('Solo se permiten archivos de imagen.');
                return;
            }

            setFile(selected);
            setError('');

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selected);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'orden' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.nombre.trim() || !formData.cargo.trim()) {
            setError('El nombre y cargo son obligatorios.');
            return;
        }

        setIsUploading(true);

        try {
            let publicUrl = null;

            // 1. Upload foto if exists
            if (file) {
                // Compress Image automatically
                const options = {
                    maxSizeMB: 0.1, // 100KB max for profile pictures
                    maxWidthOrHeight: 400, // avatar size
                    useWebWorker: true,
                    initialQuality: 0.8,
                };

                const compressedFile = await imageCompression(file, options);

                const fileExt = compressedFile.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('perfiles')
                    .upload(filePath, compressedFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('perfiles')
                    .getPublicUrl(filePath);

                publicUrl = data.publicUrl;
            }

            // 2. Insert to Database
            const { error: insertError } = await supabase
                .from('directiva')
                .insert([
                    {
                        nombre: formData.nombre.trim(),
                        cargo: formData.cargo.trim(),
                        descripcion: formData.descripcion.trim() || null,
                        orden: formData.orden,
                        url_foto: publicUrl,
                        activo: true
                    }
                ]);

            if (insertError) throw insertError;

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/directiva');
                router.refresh();
            }, 2000);

        } catch (err: any) {
            console.error('Error insertando miembro:', err);
            setError(err.message || 'Error al guardar el miembro. Por favor, intenta de nuevo.');
        } finally {
            setIsUploading(false);
        }
    };

    if (success) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center">
                <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">¡Líder Agrado con Éxito!</h2>
                    <p className="opacity-80">Redirigiendo a la lista...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link href="/admin/directiva" className="inline-flex items-center text-gray-500 hover:text-[var(--color-brand-magenta)] mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver al Equipo
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-[var(--color-brand-magenta)] pb-2 inline-block">
                Agregar Miembro de Directiva
            </h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna Izquierda: Foto */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2 text-center md:text-left">
                            Foto de Perfil
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl overflow-hidden relative hover:bg-gray-50 transition-colors aspect-[3/4]">
                            {preview ? (
                                <div className="space-y-1 text-center w-full flex flex-col items-center justify-center">
                                    <img src={preview} alt="Vista previa" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="relative z-10 flex flex-col justify-end h-full w-full pb-4">
                                        <label htmlFor="file-upload" className="cursor-pointer bg-white/90 backdrop-blur-md rounded-lg font-bold text-[var(--color-brand-magenta)] hover:bg-white px-4 py-2 shadow-sm border border-gray-200 text-sm mx-auto">
                                            Cambiar foto
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1 text-center flex flex-col items-center justify-center">
                                    <UserIcon className="mx-auto h-16 w-16 text-gray-300" />
                                    <div className="flex text-sm justify-center text-gray-600 mt-4">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--color-brand-magenta)] hover:text-magenta-500 focus-within:outline-none px-4 py-2 shadow-sm border border-gray-200 transition-all hover:border-[var(--color-brand-magenta)]">
                                            <span>Subir Foto</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Formato vertical<br />Máximo 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna Derecha: Datos */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    disabled={isUploading}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all"
                                    placeholder="Ej: Mgs. Juan Pérez"
                                />
                            </div>

                            <div>
                                <label htmlFor="cargo" className="block text-sm font-bold text-gray-700 mb-2">
                                    Cargo o Rol *
                                </label>
                                <input
                                    type="text"
                                    id="cargo"
                                    name="cargo"
                                    required
                                    value={formData.cargo}
                                    onChange={handleChange}
                                    disabled={isUploading}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all"
                                    placeholder="Ej: Presidente Provincial"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="descripcion" className="block text-sm font-bold text-gray-700 mb-2">
                                Biografía Corta / Reseña
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                rows={4}
                                value={formData.descripcion}
                                onChange={handleChange}
                                disabled={isUploading}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all resize-none"
                                placeholder="Breve reseña profesional o compromiso político..."
                            />
                        </div>

                        <div>
                            <label htmlFor="orden" className="block text-sm font-bold text-gray-700 mb-2">
                                Orden de Aparición
                            </label>
                            <input
                                type="number"
                                id="orden"
                                name="orden"
                                value={formData.orden}
                                onChange={handleChange}
                                disabled={isUploading}
                                className="w-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Números menores se muestran primero (Ej: 0 para Presidente, 1 Vicepresidente, etc).</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/directiva')}
                        disabled={isUploading}
                        className="bg-white text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 border border-gray-200 transition-colors mr-4"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isUploading || !formData.nombre || !formData.cargo}
                        className="bg-[var(--color-brand-magenta)] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#9d1d52] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5" />
                                Agregar Miembro
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
