export const metadata = {
    title: "Política de Privacidad - LOPDP | FUERZA",
    description: "Tratamiento de datos personales de adherentes al Movimiento FUERZA conforme al Código de la Democracia y la LOPDP de Ecuador.",
};

export default function PrivacidadPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl prose prose-slate md:prose-lg">
            <h1 className="text-3xl md:text-5xl font-bold mb-8">Política de Privacidad y Tratamiento de Datos Personales</h1>

            <p className="lead text-xl text-gray-600 mb-8">
                El <strong>Movimiento Provincial FUERZA (Frente de Unidad por la Equidad y Renovación)</strong>
                valora y respeta la privacidad de sus adherentes y simpatizantes, de conformidad con la Constitución del
                Ecuador, el Código de la Democracia y la Ley Orgánica de Protección de Datos Personales (LOPDP).
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Identidad del Responsable</h2>
            <p>
                El responsable del tratamiento de los datos es la Directiva Provincial de FUERZA, con jurisdicción en
                la provincia de Zamora Chinchipe, Ecuador.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Finalidad del Tratamiento de Datos</h2>
            <p>
                Los datos recopilados, particularmente en el formulario de afiliación (nombres, cédula, dirección, fecha de nacimiento),
                son utilizados exclusivamente para:
            </p>
            <ul>
                <li>Validación de firmas y apoyo ante el <strong>Consejo Nacional Electoral (CNE)</strong>.</li>
                <li>Registro en el padrón interno del Movimiento según el Régimen Orgánico.</li>
                <li>Comunicaciones internas, invitaciones a asambleas, eventos cantonales y directrices organizacionales.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Seguridad y Confidencialidad (RLS)</h2>
            <p>
                Toda su información es almacenada en servidores de bases de datos de máxima seguridad (Supabase/PostgreSQL) que implementan
                políticas a nivel de fila (Row Level Security - RLS). Esto garantiza que <strong>ninguna persona no autorizada</strong> ni desde el portal web,
                ni de manera externa, puede extraer, visualizar o manipular su cédula o información privada. Únicamente los administradores validados por el Órgano Electoral Interno pueden acceder para procesar la reportería al CNE.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Derechos de los Titulares</h2>
            <p>
                Los adherentes tienen derecho a la información, acceso, rectificación, actualización y eliminación de
                sus datos personales (desafiliación). Para ejercerlos, pueden enviar una comunicación escrita a la directiva provincial.
            </p>

            <hr className="my-10" />
            <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString('es-EC')}</p>
        </div>
    )
}
