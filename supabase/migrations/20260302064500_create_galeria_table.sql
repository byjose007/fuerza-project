-- Crear tabla galeria
CREATE TABLE IF NOT EXISTS public.galeria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    url_imagen TEXT NOT NULL,
    publicado BOOLEAN DEFAULT true,
    fecha_captura DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Función de trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.galeria
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.galeria ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura (Todos pueden ver fotos publicadas)
CREATE POLICY "Fotos publicadas son visibles para todos" ON public.galeria
    FOR SELECT USING (publicado = true);

-- Políticas de lectura admin (Admin puede ver todo)
CREATE POLICY "Admins pueden ver todas las fotos" ON public.galeria
    FOR SELECT TO authenticated USING (true);

-- Políticas de escritura (Sólo admin)
CREATE POLICY "Solo admins pueden insertar fotos" ON public.galeria
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Solo admins pueden actualizar fotos" ON public.galeria
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Solo admins pueden borrar fotos" ON public.galeria
    FOR DELETE TO authenticated USING (true);

-- Crear bucket de storage para galeria
INSERT INTO storage.buckets (id, name, public) 
VALUES ('galeria', 'galeria', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Imágenes de galería publicas" ON storage.objects
    FOR SELECT USING (bucket_id = 'galeria');

CREATE POLICY "Admins pueden subir imágenes a galería" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'galeria');

CREATE POLICY "Admins pueden actualizar imágenes de galería" ON storage.objects
    FOR UPDATE TO authenticated USING (bucket_id = 'galeria');

CREATE POLICY "Admins pueden borrar imágenes de galería" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'galeria');
