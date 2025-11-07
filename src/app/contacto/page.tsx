"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría el envío del formulario
    console.log("Formulario enviado:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: "", email: "", mensaje: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-8 text-dark">
        Contacto
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Información de contacto */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Información de Contacto
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-secondary mb-2">
                  Email
                </h3>
                <p className="text-gray-700">katemartinez1507@gmail.com</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-secondary mb-2">
                  Ubicación
                </h3>
                <p className="text-gray-700">Clan Malecón, Colombia</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-secondary mb-2">
                  Horario de Atención
                </h3>
                <p className="text-gray-700">
                  Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                  Sábados: 10:00 AM - 2:00 PM
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg text-secondary mb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Productos 100% artesanales
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Comercio justo con artesanos
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Envíos seguros a todo el país
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Atención personalizada
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Envíanos un Mensaje
            </h2>

            {submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Mapa o información adicional */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes Preguntas sobre Nuestros Productos?
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Estamos aquí para ayudarte. Contáctanos y con gusto responderemos
            todas tus dudas sobre nuestras artesanías colombianas.
          </p>
          <p className="text-lg">
            También puedes visitarnos en nuestras redes sociales para conocer más
            sobre nuestra comunidad de artesanos.
          </p>
        </div>
      </div>
    </div>
  );
}
