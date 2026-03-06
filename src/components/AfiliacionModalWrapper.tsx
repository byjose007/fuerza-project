'use client'

import { AfiliacionModal } from "@/components/AfiliacionModal";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function AfiliacionModalWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 bg-[var(--color-brand-magenta)] text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden shadow-xl shadow-magenta-500/20 hover:shadow-magenta-500/40 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative">Afíliate Ahora</span>
                <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </button>
            <AfiliacionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
