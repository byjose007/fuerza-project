"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

export default function SubirFotoPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      // Check size (max 5MB)
      if (selected.size > 5 * 1024 * 1024) {
        setError("La imagen es demasiado grande. El máximo permitido es 5MB.");
        return;
      }
      // Check type
      if (!selected.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen.");
        return;
      }

      setFile(selected);
      setError("");

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const supabase = createClient();

    if (!file || !titulo.trim()) {
      setError("La imagen y el título son obligatorios.");
      return;
    }

    setIsUploading(true);

    try {
      // 0. Compress Image (Max 300KB)
      const options = {
        maxSizeMB: 0.3, // 300KB
        maxWidthOrHeight: 1200, // HD web
        useWebWorker: true,
        initialQuality: 0.8,
      };

      const compressedFile = await imageCompression(file, options);

      // 1. Upload to Storage
      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `imagenes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("galeria")
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("galeria").getPublicUrl(filePath);

      // 3. Insert to Database
      const { error: insertError } = await supabase.from("galeria").insert([
        {
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          url_imagen: publicUrl,
          publicado: true,
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/galeria");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      console.error("Error uploading:", err);
      setError(
        err.message ||
          "Error al subir la imagen. Por favor, intenta nuevamente.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Foto Subida con Éxito!</h2>
          <p className="opacity-80">Redirigiendo a la galería...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link
        href="/admin/galeria"
        className="inline-flex items-center text-gray-500 hover:text-[var(--color-brand-magenta)] mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver a Galería
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-[var(--color-brand-magenta)] pb-2 inline-block">
        Subir Nueva Foto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Seleccionar Imagen *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl overflow-hidden relative hover:bg-gray-50 transition-colors">
              {preview ? (
                <div className="space-y-1 text-center w-full">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="max-h-64 mx-auto rounded-lg object-contain shadow-sm mb-4"
                  />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--color-brand-magenta)] hover:text-magenta-500 focus-within:outline-none px-3 py-1 shadow-sm border border-gray-200"
                    >
                      <span>Cambiar imagen</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm justify-center text-gray-600 mt-4">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[var(--color-brand-magenta)] hover:text-magenta-500 focus-within:outline-none px-4 py-2 shadow-sm border border-gray-200 transition-all hover:border-[var(--color-brand-magenta)]"
                    >
                      <span>Explorar archivos</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, WEBP hasta 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Título de la foto *
              </label>
              <input
                type="text"
                id="titulo"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={isUploading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all"
                placeholder="Ej: Recorrido en Yantzaza"
              />
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Descripción (Opcional)
              </label>
              <textarea
                id="descripcion"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={isUploading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-magenta)] focus:border-transparent transition-all resize-none"
                placeholder="Breve contexto sobre la imagen..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/galeria")}
            disabled={isUploading}
            className="bg-white text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 border border-gray-200 transition-colors mr-4"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isUploading || !file || !titulo}
            className="bg-[var(--color-brand-magenta)] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#9d1d52] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Guardar y Publicar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
