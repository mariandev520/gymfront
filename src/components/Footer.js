import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 mt-10"
    >
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">&copy; {currentYear} Pilates</p>

        <div className="flex justify-center mt-3 space-x-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            href="/terminos"
            className="hover:text-gray-200 transition duration-300"
          >
            Términos de uso
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            href="/privacidad"
            className="hover:text-gray-200 transition duration-300"
          >
            Política de privacidad
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            href="/contacto"
            className="hover:text-gray-200 transition duration-300"
          >
            Contacto
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
