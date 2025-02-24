import React from 'react';
import '../estilos/Footer.css'; // Importa el archivo CSS

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual

  return (
    <footer className="footer">
      <div className="footer-container"> {/* Contenedor para centrar y controlar ancho */}
        <div className="footer-content">
          <p>&copy; {currentYear} Pilates </p> {/* Año dinámico */}
          <div className="footer-links"> {/* Contenedor para enlaces */}
            <a href="/terminos" className="footer-link">Términos de uso</a>
            <a href="/privacidad" className="footer-link">Política de privacidad</a>
            <a href="/contacto" className="footer-link">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;