import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FUERZA - Frente de Unidad por la Equidad y Renovación",
  description: "Movimiento Provincial Fuerza - Zamora Chinchipe. Unidad, Equidad y Renovación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="bg-gray-900 justify-end text-gray-300 py-12 mt-auto">
          <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-white/95 inline-block p-2 rounded-xl mb-6">
                <img
                  src="/logo-fuerza.jpeg"
                  alt="FUERZA"
                  className="h-10 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <p className="text-sm text-gray-400">
                Movimiento Provincial Frente de Unidad por la Equidad y Renovación. Zamora Chinchipe.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Conocenos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre-nosotros" className="hover:text-white transition">Historia y Régimen</Link></li>
                <li><Link href="/principios" className="hover:text-white transition">Nuestros Principios</Link></li>
                <li><Link href="/transparencia" className="hover:text-white transition">Rendición de Cuentas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/legal/privacidad" className="hover:text-white transition">Privacidad</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Únete</h4>
              <Link
                href="/afiliacion"
                className="inline-block bg-[var(--color-brand-magenta)] text-white px-5 py-2 rounded font-medium hover:bg-[var(--color-brand-magenta-dark)] transition-colors w-full text-center"
              >
                Afiliarme
              </Link>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Movimiento Provincial FUERZA. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
