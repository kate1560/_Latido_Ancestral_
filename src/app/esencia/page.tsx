export default function EsenciaPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-dark">
        Nuestra Esencia
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            ¿Quiénes Somos?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Latido Ancestral es más que una tienda virtual; somos un puente entre
            las tradiciones ancestrales colombianas y el mundo moderno. Nos
            dedicamos a promover y preservar el arte de la artesanía hecha a mano,
            trabajando directamente con comunidades indígenas y artesanos locales.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Nuestra Misión
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Conectar a las personas con la rica herencia cultural de Colombia a
            través de productos auténticos y de alta calidad. Cada pieza que
            ofrecemos lleva consigo:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            <li>Técnicas tradicionales transmitidas de generación en generación</li>
            <li>Materiales naturales y sostenibles</li>
            <li>El amor y dedicación de nuestros artesanos</li>
            <li>Historias únicas de comunidades colombianas</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Autenticidad
              </h3>
              <p className="text-gray-700">
                Cada producto es genuinamente hecho a mano por artesanos
                colombianos, garantizando piezas únicas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Sostenibilidad
              </h3>
              <p className="text-gray-700">
                Trabajamos con materiales naturales y prácticas que respetan el
                medio ambiente y las tradiciones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Comercio Justo
              </h3>
              <p className="text-gray-700">
                Aseguramos que los artesanos reciban una compensación justa por su
                trabajo y dedicación.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Preservación Cultural
              </h3>
              <p className="text-gray-700">
                Contribuimos a mantener vivas las tradiciones ancestrales
                colombianas para futuras generaciones.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Conectamos Tradición con Modernidad
          </h2>
          <p className="text-lg leading-relaxed">
            Cada compra en Latido Ancestral apoya directamente a las comunidades
            artesanales colombianas y ayuda a preservar un legado cultural
            invaluable. Gracias por ser parte de esta historia.
          </p>
        </section>
      </div>
    </div>
  );
}
