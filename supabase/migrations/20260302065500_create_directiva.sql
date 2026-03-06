-- Crear tabla directiva
CREATE TABLE IF NOT EXISTS public.directiva (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    cargo TEXT NOT NULL,
    descripcion TEXT,
    url_foto TEXT,
    orden INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    social_links JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.directiva
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.directiva ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura (Todos pueden ver miembros activos)
CREATE POLICY "Miembros activos visibles para todos" ON public.directiva
    FOR SELECT USING (activo = true);

-- Políticas de admin (CRUD completo)
CREATE POLICY "Admins ven todo" ON public.directiva
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins insertan" ON public.directiva
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins actualizan" ON public.directiva
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins borran" ON public.directiva
    FOR DELETE TO authenticated USING (true);

-- Crear bucket de storage para fotos de perfil
INSERT INTO storage.buckets (id, name, public) 
VALUES ('perfiles', 'perfiles', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Perfiles publicos" ON storage.objects
    FOR SELECT USING (bucket_id = 'perfiles');

CREATE POLICY "Admins gestionan perfiles" ON storage.objects
    FOR ALL TO authenticated USING (bucket_id = 'perfiles') WITH CHECK (bucket_id = 'perfiles');
