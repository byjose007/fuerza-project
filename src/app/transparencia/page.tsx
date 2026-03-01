import { ShieldCheck, FileSearch, PieChart, Banknote } from "lucide-react";

export const metadata = {
    title: "Transparencia - FUERZA",
    description: "Rendición de cuentas, estados financieros y reportes al CNE del Movimiento Provincial FUERZA.",
};

export default function TransparenciaPage() {
    return (
        <div className="flex flex-col">
            <section className="bg-slate-900 text-white py-20 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-[var(--color-brand-green)]" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparencia y Cuentas Claras</h1>
                    <p className="text-xl text-gray-400">
                        La política honesta requiere auditoría pública permanente. Ponemos a disposición de Zamora Chinchipe
                        nuestros informes económicos conforme manda la Ley Orgánica Electoral (Código de la Democracia).
                    </p>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-5xl">

                    <div className="bg-white p-8 md:p-12 border border-gray-200 rounded-3xl shadow-sm text-center mb-16">
                        <div className="inline-flex bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded-full text-sm mb-6">
                            Aviso Institucional
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Informe Económico en Elaboración</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            En cumplimiento a la normativa vigente del Consejo Nacional Electoral (CNE), estamos preparando
                            nuestros reportes de ingresos, egresos y financiamiento de campaña para las próximas dignidades.
                            Dichos documentos serán publicados periódicamente en esta sección.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                            <div className="text-center">
                                <FileSearch className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                                <h4 className="font-bold text-gray-800">Reportes Anuales</h4>
                                <p className="text-sm text-gray-500">Documentos PDF auditados</p>
                            </div>
                            <div className="text-center">
                                <PieChart className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                                <h4 className="font-bold text-gray-800">Gastos de Campaña</h4>
                                <p className="text-sm text-gray-500">Facturación reportada al CNE</p>
                            </div>
                            <div className="text-center">
                                <Banknote className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                                <h4 className="font-bold text-gray-800">Cuentas de Adherentes</h4>
                                <p className="text-sm text-gray-500">Aportes voluntarios registrados</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-100 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center border border-slate-200">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Responsable Económico</h3>
                            <p className="text-gray-600 mb-4 text-sm">Designado por la Asamblea Provincial. Encargado exclusivo del control minucioso de las finanzas y el correcto registro ante la Contraloría y el CNE.</p>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-xl border border-gray-200">
                            <p className="font-semibold text-gray-800">En proceso de registro (CNE)</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
