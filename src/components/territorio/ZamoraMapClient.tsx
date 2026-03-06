'use client'

import dynamic from 'next/dynamic'

const ZamoraMap = dynamic(() => import('./ZamoraMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center animate-pulse min-h-[420px]">
            <p className="text-slate-400 font-medium">Cargando mapa...</p>
        </div>
    ),
})

interface Props { compact?: boolean }

export default function ZamoraMapClient({ compact }: Props) {
    return <ZamoraMap compact={compact} />
}

