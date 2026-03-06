-- Fix: Permitir que CUALQUIER usuario autenticado pueda leer afiliados
-- (Simplificar la política RLS mientras no hay sistema de roles implementado)

DROP POLICY IF EXISTS "Allow admins to read afiliados" ON public.afiliados;
DROP POLICY IF EXISTS "Deny anonymous selects on afiliados" ON public.afiliados;

-- Denegar lectura anónima (público no puede ver afiliados)
CREATE POLICY "Deny anonymous selects on afiliados"
ON public.afiliados FOR SELECT TO anon USING (false);

-- Cualquier usuario autenticado (admin) puede leer
CREATE POLICY "Allow authenticated to read afiliados"
ON public.afiliados FOR SELECT TO authenticated USING (true);

-- Permitir DELETE a autenticados (para limpieza desde el panel)
CREATE POLICY "Allow authenticated to delete afiliados"
ON public.afiliados FOR DELETE TO authenticated USING (true);

-- Permitir UPDATE a autenticados
CREATE POLICY "Allow authenticated to update afiliados"
ON public.afiliados FOR UPDATE TO authenticated USING (true);

-- Lo mismo para noticias: permitir todas las operaciones a autenticados
DROP POLICY IF EXISTS "Comunicadores pueden insertar y editar noticias" ON public.noticias;
CREATE POLICY "Allow authenticated full access noticias"
ON public.noticias FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Y para documentos
DROP POLICY IF EXISTS "Admins pueden gestionar documentos" ON public.documentos;
CREATE POLICY "Allow authenticated full access documentos"
ON public.documentos FOR ALL TO authenticated USING (true) WITH CHECK (true);
