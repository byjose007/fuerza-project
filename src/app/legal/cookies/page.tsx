export const metadata = {
    title: "Política de Cookies | FUERZA",
    description: "Información sobre el uso de cookies y tecnologías de seguimiento en nuestra plataforma.",
};

export default function CookiesPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
            <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
            <p>
                En la plataforma web del <strong>Movimiento Provincial FUERZA</strong> utilizamos tecnologías de rastreo (cookies) de manera limitada,
                estrictamente necesarias para el funcionamiento seguro de la plataforma, como la gestión de sesiones de adherentes (Autenticación Supabase)
                y la protección contra software automatizado o bots en nuestros formularios de registro (Turnstile).
            </p>

            <h3>1. Cookies Estrictamente Necesarias</h3>
            <p>
                Son aquellas que permiten la navegación a través de la página web y la utilización de las diferentes
                opciones o servicios que en ella existen. Estas cookies no pueden ser desactivadas en nuestros sistemas
                puesto que son críticas (por ejemplo, tokens de seguridad de sesión en los formularios de afiliación).
            </p>

            <h3>2. Cookies Analíticas</h3>
            <p>
                Utilizamos Google Analytics 4 (GA4) con IP anonimizada para cuantificar el número de usuarios y realizar la
                medición y análisis estadístico de la utilización que hacen los usuarios de los servicios ofrecidos.
                Estas métricas nos ayudan a entender la penetración territorial en Zamora Chinchipe sin identificar personalmente al votante.
            </p>

            <h3>Gestión de su consentimiento</h3>
            <p>
                Usted puede revocar o modificar su consentimiento de cookies no esenciales ajustando la configuración de su navegador web.
                Sin embargo, las cookies críticas requeridas para la validación legal del registro de adherentes son mandatorias para cursar el trámite.
            </p>
        </div>
    )
}
