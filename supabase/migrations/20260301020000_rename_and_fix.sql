-- ==========================================
-- MIGRACIÓN: Renombrar adherentes → afiliados
-- Agregar columna created_at
-- Agregar columnas faltantes en noticias
-- ==========================================

-- 1. Renombrar la tabla adherentes → afiliados
ALTER TABLE public.adherentes RENAME TO afiliados;

-- 2. Agregar columna created_at (alias de fecha_registro para compatibilidad)
ALTER TABLE public.afiliados ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
-- Migrar datos existentes de fecha_registro → created_at
UPDATE public.afiliados SET created_at = fecha_registro WHERE created_at IS NULL AND fecha_registro IS NOT NULL;

-- 3. Agregar columnas faltantes en noticias
ALTER TABLE public.noticias ADD COLUMN IF NOT EXISTS resumen TEXT;
ALTER TABLE public.noticias ADD COLUMN IF NOT EXISTS categoria VARCHAR(100);
ALTER TABLE public.noticias ADD COLUMN IF NOT EXISTS publicado BOOLEAN DEFAULT false;
ALTER TABLE public.noticias ADD COLUMN IF NOT EXISTS fecha_publicacion TIMESTAMP WITH TIME ZONE;

-- 4. Migrar datos: si estado='publicado' → publicado=true
UPDATE public.noticias SET publicado = true WHERE estado = 'publicado';

-- 5. Recrear políticas RLS para la tabla renombrada
DROP POLICY IF EXISTS "Deny anonymous selects on adherentes" ON public.afiliados;
DROP POLICY IF EXISTS "Allow anonymous inserts on adherentes" ON public.afiliados;
DROP POLICY IF EXISTS "Allow admins to read adherentes" ON public.afiliados;

CREATE POLICY "Deny anonymous selects on afiliados"
ON public.afiliados FOR SELECT TO anon USING (false);

CREATE POLICY "Allow anonymous inserts on afiliados"
ON public.afiliados FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow admins to read afiliados"
ON public.afiliados FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.user_roles WHERE id = auth.uid() AND role IN ('admin_general', 'electoral_interno')
    )
);

-- 6. Política para que admins puedan insertar noticias (con las nuevas columnas)
DROP POLICY IF EXISTS "Noticias publicadas son visibles para todos" ON public.noticias;
CREATE POLICY "Noticias publicadas son visibles para todos" ON public.noticias
  FOR SELECT USING (publicado = true OR estado = 'publicado');

-- 7. Política para inserts autenticados en noticias
CREATE POLICY "Authenticated users can insert noticias" ON public.noticias
  FOR INSERT TO authenticated WITH CHECK (true);
