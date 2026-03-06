'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

const GEO_URL = '/zamora-cantones.geojson'

function normalizeName(name: string) {
    if (!name) return ''
    return name.toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .trim()
}

interface ZamoraMapProps {
    /** Modo compacto: sin tooltip, altura reducida. Para usar como preview en otras páginas. */
    compact?: boolean
}

export default function ZamoraMap({ compact = false }: ZamoraMapProps) {
    const [data, setData] = useState<Record<string, number>>({})
    const [maxCount, setMaxCount] = useState(1)
    const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null)

    useEffect(() => {
        fetch('/api/metrics/cantones')
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data) {
                    const normalizedData: Record<string, number> = {}
                    Object.entries(json.data || {}).forEach(([key, val]) => {
                        normalizedData[normalizeName(key)] = val as number
                    })
                    setData(normalizedData)
                    const counts = Object.values(normalizedData)
                    if (counts.length > 0) setMaxCount(Math.max(...counts))
                }
            })
            .catch(console.error)
    }, [])

    const dynamicColorScale = scaleLinear<string>()
        .domain([0, maxCount])
        .range(['#fdf2f8', '#be185d'])

    const containerHeight = compact ? 'h-[420px]' : 'h-full min-h-[500px]'

    return (
        <div className={`w-full relative rounded-2xl overflow-hidden flex justify-center items-center ${containerHeight}`}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 17000,
                    center: [-78.85, -4.25]
                }}
                width={800}
                height={800}
                className="w-full h-full outline-none"
            >
                <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const rawName = geo.properties.canton || geo.properties.name
                            const normName = normalizeName(rawName)
                            const count = data[normName] || 0
                            const displayName = normName.charAt(0) + normName.slice(1).toLowerCase()

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseMove={compact ? undefined : (e) => {
                                        setTooltip({
                                            text: `${displayName}: ${count} afiliado${count !== 1 ? 's' : ''}`,
                                            x: e.clientX,
                                            y: e.clientY
                                        })
                                    }}
                                    onMouseLeave={compact ? undefined : () => setTooltip(null)}
                                    style={{
                                        default: {
                                            fill: count > 0 ? dynamicColorScale(count) : '#f1f5f9',
                                            stroke: '#ffffff',
                                            strokeWidth: 1.5,
                                            outline: 'none',
                                            transition: 'all 250ms'
                                        },
                                        hover: {
                                            fill: compact ? (count > 0 ? dynamicColorScale(count) : '#f1f5f9') : '#831843',
                                            stroke: '#ffffff',
                                            strokeWidth: compact ? 1.5 : 2,
                                            outline: 'none',
                                            cursor: compact ? 'default' : 'pointer',
                                            transition: 'all 250ms'
                                        },
                                        pressed: {
                                            fill: '#831843',
                                            outline: 'none',
                                        }
                                    }}
                                />
                            )
                        })
                    }
                </Geographies>
            </ComposableMap>

            {/* Tooltip: solo cuando no es compact */}
            {!compact && tooltip && (
                <div
                    className="fixed bg-gray-900/90 text-white px-3 py-2 rounded-lg shadow-xl font-medium pointer-events-none z-[100] text-sm whitespace-nowrap backdrop-blur-sm border border-white/10"
                    style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    )
}
