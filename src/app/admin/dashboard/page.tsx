import { createClient } from '@/lib/supabase/server'
import { Users, UserCheck, MapPin, TrendingUp } from 'lucide-react'

async function getMetrics() {
    const supabase = await createClient()

    const [{ count: total }, { count: mes }, { data: cantonData }] = await Promise.all([
        supabase.from('afiliados').select('*', { count: 'exact', head: true }),
        supabase.from('afiliados').select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        supabase.from('afiliados').select('canton'),
    ])

    const porCanton: Record<string, number> = {}
    cantonData?.forEach(r => {
        if (r.canton) porCanton[r.canton] = (porCanton[r.canton] || 0) + 1
    })
    const topCanton = Object.entries(porCanton).sort((a, b) => b[1] - a[1])[0]

    return { total: total ?? 0, mes: mes ?? 0, topCanton, porCanton }
}

export default async function AdminDashboard() {
    const { total, mes, topCanton, porCanton } = await getMetrics()

    const stats = [
        { label: 'Total Afiliados', value: total, icon: Users, color: 'bg-[var(--color-brand-magenta)]/10 text-[var(--color-brand-magenta)]', trend: '+' + mes + ' este mes' },
        { label: 'Nuevos este mes', value: mes, icon: TrendingUp, color: 'bg-emerald-100 text-emerald-700', trend: 'Mes actual' },
        { label: 'Cantón Líder', value: topCanton?.[0] ?? '—', icon: MapPin, color: 'bg-blue-100 text-blue-700', trend: topCanton ? topCanton[1] + ' registros' : '' },
        { label: 'Cantones Activos', value: Object.keys(porCanton).length, icon: UserCheck, color: 'bg-amber-100 text-amber-700', trend: 'de 9 cantones' },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Panel de control del Movimiento FUERZA</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map(({ label, value, icon: Icon, color, trend }) => (
                    <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                        <p className="text-xs text-gray-400 mt-1">{trend}</p>
                    </div>
                ))}
            </div>

            {/* Canton Breakdown */}
            {Object.keys(porCanton).length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-base font-bold text-gray-900 mb-5">Afiliados por Cantón</h2>
                    <div className="space-y-3">
                        {Object.entries(porCanton)
                            .sort((a, b) => b[1] - a[1])
                            .map(([canton, count]) => {
                                const pct = total > 0 ? Math.round((count / total) * 100) : 0
                                return (
                                    <div key={canton}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">{canton}</span>
                                            <span className="text-gray-500">{count} ({pct}%)</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--color-brand-magenta)] rounded-full transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )}

            {total === 0 && (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-600">Aún no hay afiliados registrados</h3>
                    <p className="text-sm text-gray-400 mt-2">Las métricas aparecerán una vez que ciudadanos se afilien.</p>
                </div>
            )}
        </div>
    )
}
