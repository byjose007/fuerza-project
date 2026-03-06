-- Crea una función segura (SECURITY DEFINER) para que cualquier usuario pueda obtener
-- métricas agregadas por cantón sin tener acceso a los registros de afiliados.
CREATE OR REPLACE FUNCTION public.get_canton_metrics()
RETURNS TABLE (canton text, count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY 
    SELECT a.canton::text, COUNT(*)::bigint 
    FROM public.afiliados a 
    WHERE a.canton IS NOT NULL
    GROUP BY a.canton;
END;
$$;

-- Otorga permisos de ejecución a los roles anónimo y autenticado
GRANT EXECUTE ON FUNCTION public.get_canton_metrics() TO anon;
GRANT EXECUTE ON FUNCTION public.get_canton_metrics() TO authenticated;
