'use client'

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    initialSettings: Record<string, string>;
}

export function AjustesForm({ initialSettings }: Props) {
    const supabase = createClient();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    // State for exactly the keys we care about right now
    const [settings, setSettings] = useState({
        home_message_enabled: initialSettings.home_message_enabled === 'true',
        home_message_text: initialSettings.home_message_text || '',
        home_message_author: initialSettings.home_message_author || '',
    });

    const handleChange = (field: keyof typeof settings, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // We need to update multiple rows in site_settings
            // Supabase unfortunately requires individual updates or an upsert array

            const updates = [
                { key: 'home_message_enabled', value: settings.home_message_enabled.toString() },
                { key: 'home_message_text', value: settings.home_message_text },
                { key: 'home_message_author', value: settings.home_message_author },
            ];

            const { error: upsertError } = await supabase
                .from('site_settings')
                .upsert(updates);

            if (upsertError) throw upsertError;

            setSuccessMessage('Ajustes guardados correctamente.');
            router.refresh();

            // Clear success message after 3s
            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (err: any) {
            console.error('Error saving settings:', err);
            setError('Error al guardar los ajustes. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8">
            {successMessage && (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{successMessage}</span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-100">
                    {error}
                </div>
            )}

            {/* Bloque: Mensaje Presidencial Home */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--color-brand-magenta)]/10 rounded-lg text-[var(--color-brand-magenta)]">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Mensaje de Presidencia (Home)</h2>
                            <p className="text-sm text-gray-500">Bloque de citación destacado en la página de inicio.</p>
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={settings.home_message_enabled}
                                onChange={(e) => handleChange('home_message_enabled', e.target.checked)}
                            />
                            <div className={`block w-14 h-8 rounded-full transition-colors ${settings.home_message_enabled ? 'bg-[var(--color-brand-magenta)]' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.home_message_enabled ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="ml-3 text-sm font-bold text-gray-700">
                            {settings.home_message_enabled ? 'Visible' : 'Oculto'}
                        </span>
                    </label>
                </div>

                <div className={`p-6 space-y-6 ${!settings.home_message_enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Cita / Mensaje Principal
                        </label>
                        <textarea
                            rows={4}
                            value={settings.home_message_text}
                            onChange={(e) => handleChange('home_message_text', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all resize-none text-gray-800"
                            placeholder="Ej: Luchamos por la justicia en Zamora Chinchipe..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Firma / Autor
                        </label>
                        <input
                            type="text"
                            value={settings.home_message_author}
                            onChange={(e) => handleChange('home_message_author', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all text-gray-800"
                            placeholder="Ej: Directiva Provincial o Mgs. Nombre Apellido"
                        />
                    </div>
                </div>
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-[var(--color-brand-magenta)] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#9d1d52] transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Guardar Ajustes
                </button>
            </div>
        </form>
    );
}
