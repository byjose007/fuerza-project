"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Trash2, Loader2 } from "lucide-react";

interface Props {
  id: string;
  activo: boolean;
  urlFoto: string | null;
}

export function DirectivaClientActions({ id, activo, urlFoto }: Props) {
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleVisibility = async () => {
    const supabase = createClient();
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("directiva")
        .update({ activo: !activo })
        .eq("id", id);

      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Error actualizando visibilidad:", error);
      alert("No se pudo actualizar la visibilidad.");
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMiembro = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este miembro del equipo?"))
      return;

    const supabase = createClient();
    setIsDeleting(true);
    try {
      // 1. Delete from database
      const { error: dbError } = await supabase
        .from("directiva")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // 2. Extract path and delete from storage
      if (urlFoto) {
        const pathSegments = urlFoto.split("/perfiles/");
        if (pathSegments.length > 1) {
          const filePath = pathSegments[1];
          await supabase.storage.from("perfiles").remove([filePath]);
        }
      }

      router.refresh();
    } catch (error) {
      console.error("Error eliminando miembro:", error);
      alert("No se pudo eliminar al miembro.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={toggleVisibility}
        disabled={isUpdating || isDeleting}
        className="p-2 text-gray-400 hover:text-[var(--color-brand-magenta)] bg-gray-50 hover:bg-magenta-50 rounded-lg transition-colors disabled:opacity-50"
        title={activo ? "Ocultar públicamente" : "Mostrar públicamente"}
      >
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : activo ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={deleteMiembro}
        disabled={isUpdating || isDeleting}
        className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Eliminar registro"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
