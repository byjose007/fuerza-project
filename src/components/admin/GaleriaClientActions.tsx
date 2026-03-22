"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Trash2, Loader2 } from "lucide-react";

interface Props {
  id: string;
  publicado: boolean;
  urlImagen: string;
}

export function GaleriaClientActions({ id, publicado, urlImagen }: Props) {
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleVisibility = async () => {
    const supabase = createClient();
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("galeria")
        .update({ publicado: !publicado })
        .eq("id", id);

      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Error actualizando visibilidad:", error);
      alert("No se pudo actualizar la foto.");
    } finally {
      setIsUpdating(false);
    }
  };

  const deletePhoto = async () => {
    if (
      !window.confirm("¿Seguro que deseas eliminar esta foto permanentemente?")
    )
      return;

    const supabase = createClient();
    setIsDeleting(true);
    try {
      // 1. Delete from database
      const { error: dbError } = await supabase
        .from("galeria")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // 2. Extract path and delete from storage
      // url: https://.../storage/v1/object/public/galeria/imagenes/xxx.jpg
      const pathSegments = urlImagen.split("/galeria/");
      if (pathSegments.length > 1) {
        const filePath = pathSegments[1];
        await supabase.storage.from("galeria").remove([filePath]);
      }

      router.refresh();
    } catch (error) {
      console.error("Error eliminando foto:", error);
      alert("No se pudo eliminar la foto.");
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
        title={publicado ? "Ocultar foto" : "Hacer pública"}
      >
        {isUpdating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : publicado ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={deletePhoto}
        disabled={isUpdating || isDeleting}
        className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Eliminar foto"
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
