import Link from "next/link";
import * as motion from "framer-motion/client";
import { ArrowRight, FileText, Component, Users, ArrowUpRight, MapPin } from "lucide-react";
import ZamoraMapClient from "@/components/territorio/ZamoraMapClient";
import { AfiliacionModalWrapper } from "@/components/AfiliacionModalWrapper";
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60; // Revalida cada minuto

export default async function Home() {
  const supabase = await createClient();

  // Fetch Site Settings
  const { data: settingsData } = await supabase.from('site_settings').select('*');
  const settings = settingsData?.reduce((acc: Record<string, string>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {}) || {};

  const isMessageEnabled = settings.home_message_enabled === 'true';
  return (
    <>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          {/* Background gradient accènts */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-[var(--color-brand-magenta)]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-[var(--color-brand-magenta)]/3 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta-dark)] text-sm font-bold tracking-wide uppercase mb-8 border border-[var(--color-brand-magenta)]/20 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-magenta)] animate-pulse" />
              Movimiento Provincial
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mb-6 leading-tight"
            >
              Unidad, Equidad y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-magenta)] via-purple-500 to-indigo-600 drop-shadow-sm">Renovación</span> para Zamora Chinchipe
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 font-medium"
            >
              Somos la fuerza que nace de su gente. Defendemos la Amazonía, promovemos la justicia social y construimos un futuro con humanismo democrático.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <AfiliacionModalWrapper />
              <Link
                href="/principios"
                className="inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-[var(--color-brand-magenta)] hover:bg-white hover:text-[var(--color-brand-magenta)] transition-all duration-300 shadow-sm"
              >
                Conoce más
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Principios preview */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Pilares</h2>
              <p className="text-lg text-gray-600">
                Creemos en una política transparente, orientada al desarrollo sostenible y al Sumak Kawsay.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta)] rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Humanismo Democrático</h3>
                <p className="text-gray-600 mb-6">
                  El ser humano como centro de nuestras políticas, garantizando derechos y fomentando la participación ciudadana integral.
                </p>
                <Link href="/principios#humanismo" className="text-[var(--color-brand-magenta)] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Leer más <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta)] rounded-xl flex items-center justify-center mb-6">
                  <Component className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Defensa de la Amazonía</h3>
                <p className="text-gray-600 mb-6">
                  Protección irrestricta de nuestros recursos naturales y promoción del desarrollo provincial equitativo y sustentable.
                </p>
                <Link href="/principios#amazonia" className="text-[var(--color-brand-magenta)] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Leer más <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparencia Total</h3>
                <p className="text-gray-600 mb-6">
                  Rendión de cuentas constante y acceso público a los reportes financieros. Gestión de puertas abiertas.
                </p>
                <Link href="/transparencia" className="text-slate-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Visitar portal <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mapa Interactivo de Presencia — Social Proof */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Accent blobs */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[var(--color-brand-magenta)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Encabezado */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-magenta)]/20 text-[var(--color-brand-magenta)] text-sm font-bold tracking-wide uppercase mb-6">
                <MapPin className="w-4 h-4" /> Presencia Real en el Territorio
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Estamos en los <span className="text-[var(--color-brand-magenta)]">9 cantones</span> de Zamora Chinchipe
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Pasa el cursor sobre cada cantón para ver el número de afiliados. La intensidad del color refleja la densidad de afiliación.
              </p>
            </div>

            {/* Mapa con hover tooltips habilitados */}
            <div className="max-w-4xl mx-auto h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-800/50">
              <ZamoraMapClient />
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Link
                href="/sobre-nosotros#presencia-territorial"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group"
              >
                Ver análisis detallado por cantón
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Message Update Block */}
        {isMessageEnabled && (
          <section className="py-24 bg-[var(--color-brand-magenta)] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Mensaje de la Presidencia Provincial</h2>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl shadow-black/10">
                  <p className="text-xl md:text-2xl font-medium italic mb-6 leading-relaxed">
                    "{settings.home_message_text || 'Información en proceso de actualización conforme a la normativa vigente del CNE.'}"
                  </p>
                  <p className="text-base font-bold opacity-90 uppercase tracking-widest text-[#fdf2f8]">
                    — {settings.home_message_author || 'Próximamente disponible'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </>
  );
}
