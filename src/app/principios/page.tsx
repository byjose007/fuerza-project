import { Heart, Leaf, Lightbulb, Users, Globe2, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Nuestros Principios - FUERZA",
    description: "Declaración de principios filosóficos: Humanismo Democrático, Defensa de la Amazonía, Sumak Kawsay y más.",
};

const principiosList = [
    {
        icon: <Heart className="w-8 h-8 text-[var(--color-brand-magenta)]" />,
        title: "Humanismo Democrático",
        description: "Creemos fervientemente que el fin primordial del Estado y de la política debe ser el ser humano. Fomentamos la libertad, el respeto absoluto de los derechos y la participación democrática activa en todas las decisiones de la provincia.",
        id: "humanismo"
    },
    {
        icon: <Users className="w-8 h-8 text-blue-500" />,
        title: "Justicia Social y Equidad",
        description: "Luchamos por reducir las brechas de desigualdad. Exigimos educación de calidad, conectividad, salud digna y oportunidades reales para todas las personas de Zamora Chinchipe, sin distinción alguna.",
        id: "justicia"
    },
    {
        icon: <Leaf className="w-8 h-8 text-[var(--color-brand-green)]" />,
        title: "Defensa de la Amazonía",
        description: "Nuestra provincia es rica en biodiversidad y recursos naturales. Condenamos y combatimos el extractivismo irresponsable. Proponemos una economía que respete el entorno natural, el agua y nuestros páramos.",
        id: "amazonia"
    },
    {
        icon: <Globe2 className="w-8 h-8 text-teal-600" />,
        title: "Sumak Kawsay (Buen Vivir)",
        description: "Nuestra meta estructural es el Buen Vivir, alcanzando no solo prosperidad material sino también un equilibrio espiritual y cultural con la naturaleza y nuestra comunidad local.",
        id: "sumak-kawsay"
    },
    {
        icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
        title: "Interculturalidad y Unidad",
        description: "Zamora Chinchipe es un crisol de nacionalidades. Celebramos nuestra diversidad (Shuar, Saraguro, Mestizos, etc.) integrando la plurinacionalidad como fortaleza transversal de nuestra fuerza política.",
        id: "interculturalidad"
    }
];

export default function PrincipiosPage() {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Declaración de Principios</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        El fundamento ideológico que guía a la FUERZA de Zamora Chinchipe. Somos de centro progresista, promoviendo libertad, equidad y respeto a nuestra tierra.
                    </p>
                </div>
            </section>

            {/* Philosophy Grids */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid gap-12">
                        {principiosList.map((principio) => (
                            <div
                                key={principio.id}
                                id={principio.id}
                                className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all scroll-m-24"
                            >
                                <div className="bg-white p-4 rounded-xl shadow-sm decrease-opacity">
                                    {principio.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{principio.title}</h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {principio.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plan de Gobierno Download */}
            <section className="py-16 bg-[var(--color-brand-green)] text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Plan de Trabajo</h2>
                        <p className="opacity-90 max-w-xl">
                            Nuestro plan detallado de propuestas y metas de campaña de conformidad a lo establecido por el Código de la Democracia.
                        </p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end">
                        <button disabled className="bg-white/20 cursor-not-allowed border border-white/40 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium backdrop-blur-sm transition-colors">
                            <FileText className="w-5 h-5" />
                            Documento en elaboración
                        </button>
                        <p className="text-xs opacity-75 mt-2">(Próximo a oficializarse)</p>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">¿Compartes nuestra visión?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        El cambio verdadero sólo es posible si ciudadanas y ciudadanos probos deciden dar el paso al frente. Inscríbete como adherente de FUERZA.
                    </p>
                    <Link
                        href="/afiliacion"
                        className="inline-block bg-[var(--color-brand-magenta)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-brand-magenta-dark)] hover:scale-105 transition-all shadow-xl shadow-magenta-500/20"
                    >
                        Unete a la Transformación
                    </Link>
                </div>
            </section>
        </div>
    );
}
