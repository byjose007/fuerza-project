-- Tabla para configuraciones y textos del sitio
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger para updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Lectura pública (Todos pueden ver los ajustes del sitio para renderizarlos)
CREATE POLICY "Ajustes visibles para todos" ON public.site_settings
    FOR SELECT USING (true);

-- Escritura solo admin
CREATE POLICY "Solo admins modifican ajustes" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insertar configuraciones base por defecto
INSERT INTO public.site_settings (key, value, description) VALUES 
('home_message_enabled', 'true', 'Mostrar u ocultar el bloque de mensaje presidencial en el inicio'),
('home_message_text', 'Luchamos incansablemente por la justicia y equidad en cada cantón de nuestra provincia. Somos la voz de la Amazonía.', 'El texto principal del mensaje presidencial'),
('home_message_author', 'Directiva Provincial', 'El nombre de quien firma el mensaje')
ON CONFLICT (key) DO NOTHING;
