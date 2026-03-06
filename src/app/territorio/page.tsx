import { redirect } from 'next/navigation'

// /territorio ha sido consolidada dentro de /sobre-nosotros
// Este redirect mantiene compatibilidad con links externos y SEO
export default function TerritorioRedirect() {
    redirect('/sobre-nosotros#presencia-territorial')
}
