import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Latido Ancestral</h3>
            <p className="text-gray-300">
              Promoviendo la cultura y tradición ancestral colombiana a través de artesanías hechas a mano.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/esencia" className="text-gray-300 hover:text-accent transition-colors">
                  Nuestra Esencia
                </Link>
              </li>
              <li>
                <Link href="/colecciones" className="text-gray-300 hover:text-accent transition-colors">
                  Colecciones
                </Link>
              </li>
              <li>
                <Link href="/inspiracion" className="text-gray-300 hover:text-accent transition-colors">
                  Inspiración
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: katemartinez1507@gmail.com</li>
              <li>Clan: Malecón</li>
              <li>Colombia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Latido Ancestral. Todos los derechos reservados.</p>
          <p className="mt-2">Kateryn Martinez</p>
        </div>
      </div>
    </footer>
  );
}
