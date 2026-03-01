-- ==========================================
-- SCRIPT DE INICIALIZACIÓN: PROYECTO FUERZA
-- CUMPLIMIENTO LOPDP / RLS / SEGURIDAD
-- ==========================================

-- Extensión para uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES Y USUARIOS (ADMIN / DASHBOARD)
-- Se apoya en auth.users de Supabase.
CREATE TABLE public.user_roles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin_general', 'comunicacion', 'responsable_economico', 'electoral_interno')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. ADHERENTES (CRÍTICO - LOPDP)
CREATE TABLE public.adherentes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    cedula VARCHAR(10) UNIQUE NOT NULL, -- Será cifrada o de solo lectura
    fecha_nacimiento DATE NOT NULL,
    residencia VARCHAR(255) NOT NULL,
    canton VARCHAR(100) NOT NULL,
    parroquia VARCHAR(100) NOT NULL,
    es_permanente BOOLEAN DEFAULT false,
    acepta_principios BOOLEAN NOT NULL DEFAULT false,
    no_pertenece_movimiento BOOLEAN NOT NULL DEFAULT false,
    consentimiento_datos BOOLEAN NOT NULL DEFAULT false,
    email VARCHAR(255),
    telefono VARCHAR(20),
    ip_registro VARCHAR(45),
    estado_validacion VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_validacion IN ('pendiente', 'aprobado', 'rechazado')),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS estricto para Adherentes
ALTER TABLE public.adherentes ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS RLS (ADHERENTES)
-- Nadie anónimo puede leer adherentes
CREATE POLICY "Deny anonymous selects on adherentes" 
ON public.adherentes FOR SELECT TO anon USING (false);

-- Inserción anónima permitida (para el formulario de registro)
CREATE POLICY "Allow anonymous inserts on adherentes" 
ON public.adherentes FOR INSERT TO anon WITH CHECK (true);

-- Solo roles admins y electorales pueden leer adherentes
CREATE POLICY "Allow admins to read adherentes" 
ON public.adherentes FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.user_roles WHERE id = auth.uid() AND role IN ('admin_general', 'electoral_interno')
    )
);

-- 3. NOTICIAS Y COMUNICADOS
CREATE TABLE public.noticias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    contenido TEXT NOT NULL,
    imagen_url TEXT,
    estado VARCHAR(20) DEFAULT 'borrador' CHECK (estado IN ('borrador', 'publicado')),
    autor_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Noticias publicadas son visibles para todos" ON public.noticias FOR SELECT USING (estado = 'publicado');
CREATE POLICY "Comunicadores pueden insertar y editar noticias" ON public.noticias FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE id = auth.uid() AND role IN ('admin_general', 'comunicacion'))
);

-- 4. DOCUMENTOS Y TRANSPARENCIA
CREATE TABLE public.documentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('regimen', 'principios', 'financiero', 'kit_prensa', 'capacitacion', 'plan_gobierno')),
    file_url TEXT NOT NULL,
    publico BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Documentos publicos son visibles por todos" ON public.documentos FOR SELECT USING (publico = true);
CREATE POLICY "Admins pueden gestionar documentos" ON public.documentos FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE id = auth.uid() AND role IN ('admin_general', 'responsable_economico', 'comunicacion'))
);

-- 5. AUDITORÍA / LOGS (Insert Only)
CREATE TABLE public.auditoria_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tabla_afectada VARCHAR(100) NOT NULL,
    registro_id UUID NOT NULL,
    accion VARCHAR(50) NOT NULL,
    usuario_id UUID, -- NULL si es del sistema o anónimo
    detalles JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.auditoria_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nadie lee auditoria excepto admin" ON public.auditoria_logs FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE id = auth.uid() AND role = 'admin_general')
);
-- Trigger para insertar logs automáticamente se puede añadir después.

-- Configuración de Buckets Storage
INSERT INTO storage.buckets (id, name, public) VALUES ('documentos_oficiales', 'documentos_oficiales', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
