'use client'

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

interface Foto {
    id: string;
    titulo: string;
    descripcion: string | null;
    url_imagen: string;
}

interface Props {
    fotos: Foto[];
}

export default function GaleriaClient({ fotos }: Props) {
    const [index, setIndex] = useState(-1);

    if (!fotos || fotos.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No hay fotos publicadas en este momento.</p>
            </div>
        );
    }

    const slides = fotos.map(f => ({
        src: f.url_imagen,
        title: f.titulo,
        description: f.descripcion || undefined
    }));

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {fotos.map((foto, i) => (
                    <div
                        key={foto.id}
                        className="group relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                        onClick={() => setIndex(i)}
                    >
                        <img
                            src={foto.url_imagen}
                            alt={foto.titulo || "Foto de Galería"}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {foto.titulo}
                            </h3>
                            {foto.descripcion && (
                                <p className="text-gray-300 text-sm mt-2 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {foto.descripcion}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Zoom, Captions]}
                captions={{ descriptionTextAlign: "center", descriptionMaxLines: 3 }}
                zoom={{ maxZoomPixelRatio: 3 }}
            />
        </>
    );
}
