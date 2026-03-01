'use client'

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, Component, Users, ArrowUpRight } from "lucide-react";
import { AfiliacionModal } from "@/components/AfiliacionModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <AfiliacionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          {/* Background gradient accènts */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-[var(--color-brand-magenta)]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-[var(--color-brand-magenta)]/3 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta-dark)] text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-magenta)] animate-pulse" />
              Movimiento Provincial
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mb-6">
              Unidad, Equidad y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-magenta)] to-purple-600">Renovación</span> para Zamora Chinchipe
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12">
              Somos la fuerza que nace de su gente. Defendemos la Amazonía, promovemos la justicia social y construimos un futuro con humanismo democrático.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-magenta)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-brand-magenta-dark)] transition-all hover:scale-105 shadow-xl shadow-magenta-500/20"
              >
                Afíliate Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/principios"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-[var(--color-brand-magenta)] hover:text-[var(--color-brand-magenta)] transition-all"
              >
                Conoce nuestro plan
              </Link>
            </div>
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

        {/* Message Update Block */}
        <section className="py-24 bg-[var(--color-brand-magenta)] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Mensaje de la Presidencia Provincial</h2>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <p className="text-lg md:text-xl font-medium italic mb-4">
                  "Información en proceso de actualización conforme a la normativa vigente del CNE."
                </p>
                <p className="text-sm opacity-80">Próximamente disponible</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
