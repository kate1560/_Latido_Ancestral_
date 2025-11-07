"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-accent transition-colors">
            Latido Ancestral
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/esencia" className="hover:text-accent transition-colors">
                Nuestra Esencia
              </Link>
            </li>
            <li>
              <Link href="/colecciones" className="hover:text-accent transition-colors">
                Colecciones
              </Link>
            </li>
            <li>
              <Link href="/inspiracion" className="hover:text-accent transition-colors">
                Inspiración
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-accent transition-colors">
                Contacto
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            <li>
              <Link
                href="/"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/esencia"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nuestra Esencia
              </Link>
            </li>
            <li>
              <Link
                href="/colecciones"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Colecciones
              </Link>
            </li>
            <li>
              <Link
                href="/inspiracion"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inspiración
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
