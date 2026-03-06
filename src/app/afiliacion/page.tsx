import { AfiliacionForm } from '@/components/AfiliacionForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Afiliación Oficial | Fuerza',
    description: 'Únete formalmente al Movimiento Provincial Fuerza mediante este formulario.',
}

export default function AfiliacionPage() {
    return (
        <div className="bg-slate-50 py-12 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <AfiliacionForm isModal={false} />
            </div>
        </div>
    )
}
