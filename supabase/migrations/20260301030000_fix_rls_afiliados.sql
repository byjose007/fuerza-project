-- Fix: Recrear política de INSERT anónimo para afiliados
-- La política original se perdió al renombrar la tabla

-- Eliminar políticas existentes para recrearlas limpiamente
DROP POLICY IF EXISTS "Allow anonymous inserts on afiliados" ON public.afiliados;
DROP POLICY IF EXISTS "Allow anonymous inserts on adherentes" ON public.afiliados;

-- Permitir INSERT anónimo (formulario público de afiliación)
CREATE POLICY "Allow anonymous inserts on afiliados"
ON public.afiliados FOR INSERT TO anon WITH CHECK (true);

-- Permitir INSERT autenticado también (por si un admin registra manualmente)
CREATE POLICY "Allow authenticated inserts on afiliados"
ON public.afiliados FOR INSERT TO authenticated WITH CHECK (true);
