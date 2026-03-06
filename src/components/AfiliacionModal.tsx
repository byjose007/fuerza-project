'use client'

import { useEffect, useRef } from 'react'
import { X, Shield } from 'lucide-react'
import { AfiliacionForm } from '@/components/AfiliacionForm'

interface AfiliacionModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AfiliacionModal({ isOpen, onClose }: AfiliacionModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6"
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 custom-scrollbar">

                {/* Close Button that floats above the gradient */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                <AfiliacionForm isModal={true} onSuccess={onClose} />

            </div>
        </div>
    )
}
