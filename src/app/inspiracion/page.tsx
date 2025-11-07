export default function InspiracionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-dark">
        Inspiración
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            El Arte de Nuestras Raíces
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cada artesanía que ofrecemos nace de las manos expertas de artesanos
            que han heredado conocimientos ancestrales. Estas técnicas se han
            perfeccionado a lo largo de generaciones, y cada pieza refleja no solo
            habilidad, sino también el alma de nuestra cultura.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Desde las fibras naturales de la caña flecha hasta los vibrantes
            colores de las mochilas wayuu, cada material cuenta su propia historia
            y conecta con la tierra colombiana.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Tradiciones que Perduran
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Sombrero Vueltiao
              </h3>
              <p className="text-gray-700">
                Símbolo cultural de Colombia, el sombrero vueltiao es tejido con
                fibra de caña flecha por las comunidades Zenú. Cada sombrero puede
                tomar días o semanas en completarse, dependiendo de la cantidad de
                vueltas y la complejidad del diseño.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Mochilas Wayuu
              </h3>
              <p className="text-gray-700">
                Las mochilas wayuu son creadas por las mujeres de la comunidad
                Wayuu en La Guajira. Cada mochila es única y puede tomar hasta un
                mes en tejerse, con diseños que representan la cosmovisión y las
                historias de su pueblo.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                Hamacas Artesanales
              </h3>
              <p className="text-gray-700">
                Las hamacas y sillas hamaca son parte integral de la vida
                cotidiana en las regiones cálidas de Colombia. Tejidas con
                técnicas tradicionales, combinan comodidad con belleza artesanal.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Cada Compra, Una Historia
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Al adquirir una de nuestras artesanías, no solo llevas a casa un
            producto hermoso y de calidad, sino que también te conviertes en parte
            de una cadena de preservación cultural que se extiende por
            generaciones.
          </p>
          <p className="text-lg leading-relaxed">
            Cada hilo, cada fibra, cada nudo, lleva consigo el latido ancestral de
            nuestra tierra y nuestra gente.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Materiales Naturales
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Nuestros artesanos trabajan con materiales que provienen directamente
            de la naturaleza:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            <li>Caña flecha: Fibra natural utilizada para los sombreros vueltiaos</li>
            <li>Algodón: Base para las coloridas mochilas wayuu</li>
            <li>Fique: Fibra resistente para hamacas y productos duraderos</li>
            <li>Tintes naturales: Colores extraídos de plantas y minerales</li>
          </ul>
        </section>

        <section className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4 text-dark">
            Déjate Inspirar por la Tradición
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Explora nuestra colección y encuentra la pieza que resuene con tu
            espíritu. Cada artesanía espera contar su historia.
          </p>
        </section>
      </div>
    </div>
  );
}
