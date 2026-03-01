import { Download, Users, MapPin, Scale, Flag } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Sobre FUERZA - Movimiento Provincial Zamora Chinchipe",
    description: "Conoce la historia, estructura y el Régimen Orgánico del Movimiento Frente de Unidad por la Equidad y Renovación.",
};

export default function SobreNosotrosPage() {
    return (
        <div className="flex flex-col">
            {/* Header Banner */}
            <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-magenta)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre FUERZA</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Un movimiento ciudadano nacido en Zamora Chinchipe con la convicción de renovar la política con ética, transparencia y participación real.
                    </p>
                </div>
            </section>

            {/* Main Content grid */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12">

                    {/* Left Column: History & Documents */}
                    <div className="md:col-span-8 space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Flag className="w-8 h-8 text-[var(--color-brand-magenta)]" />
                                Nuestra Historia
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    El <strong>Frente de Unidad por la Equidad y Renovación (FUERZA)</strong> nace de la necesidad apremiante de devolverle a Zamora Chinchipe una representación política digna, alejada de las prácticas de la vieja política y conectada genuinamente con las bases ciudadanas.
                                </p>
                                <p>
                                    Somos una amalgama de juventudes emprendedoras, líderes campesinos, profesionales, nacionalidades indígenas y ciudadanos que compartimos una misma visión: construir una provincia próspera, equitativa y respetuosa de la Amazonía.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Scale className="w-8 h-8 text-[var(--color-brand-green)]" />
                                Régimen Orgánico
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Nuestro accionar está estrictamente regido por nuestro marco legal interno, aprobado por el Consejo Nacional Electoral (CNE), asegurando democracia interna y transparencia irrestricta.
                            </p>
                            <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="font-bold text-lg">Régimen Orgánico de FUERZA</h3>
                                    <p className="text-sm text-gray-500">Documento Oficial. PDF, 416 KB (v. Final)</p>
                                </div>
                                {/* 
                  NOTE FOR USER: In a real deploy, these files would be uploaded to Supabase Storage.
                  For this MVP, we provide a placeholder download button.
                */}
                                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                                    <Download className="w-5 h-5" />
                                    Descargar PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Structure Sidebar */}
                    <div className="md:col-span-4">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                                <Users className="w-6 h-6 text-[var(--color-brand-magenta)]" />
                                Estructura Orgánica
                            </h3>

                            <ul className="space-y-6">
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[var(--color-brand-magenta)] before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Asamblea Provincial</h4>
                                    <p className="text-sm text-gray-500">Máximo organismo de decisión democrática de los adherentes.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Directiva Provincial</h4>
                                    <p className="text-sm text-gray-500 italic pb-2">Información de autoridades en proceso de actualización ante el CNE.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Directivas Cantonales</h4>
                                    <p className="text-sm text-gray-500">Representación en los cantones de Zamora Chinchipe.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[var(--color-brand-green)] before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Órgano Electoral Interno</h4>
                                    <p className="text-sm text-gray-500">Garante de la democracia partidista interna.</p>
                                </li>
                                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                                    <h4 className="font-bold text-gray-900 mb-1">Defensoría</h4>
                                    <p className="text-sm text-gray-500">Protección de los derechos de los adherentes.</p>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                <Link href="/afiliacion" className="text-[var(--color-brand-magenta)] font-semibold hover:underline flex items-center justify-center gap-1">
                                    Quieres ser parte? <Users className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Map Placeholder */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-2">
                        <MapPin className="text-[var(--color-brand-green)]" />
                        Presencia Territorial
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                        Estamos consolidando nuestra presencia en los cantones y parroquias de Zamora Chinchipe, con brigadas ciudadanas y puntos de información.
                    </p>
                    <div className="aspect-video max-w-4xl mx-auto bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
                        <div className="text-center p-6">
                            <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">Mapa Interactivo en Construcción</p>
                            <p className="text-sm text-slate-400">Integración con datos cantonales próxima a lanzarse</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
