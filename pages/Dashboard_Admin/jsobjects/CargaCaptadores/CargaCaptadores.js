export default {
  async cargar() {
    /*
     * Lista de Embajadores. Ajusté el código, clave y otros datos según el nuevo usuario.
     */
    const embajadores = [
      {
        codigo   : "CAP034",          // Nuevo código para este embajador
        clave    : "Nairetz123*",            // Contraseña predeterminada
        nombre   : "Nairet Zerpa", 
        telefono : "04147007077",     // Teléfono del embajador
        cedula   : "V15174260",       // Cédula del embajador
        correo   : "nairetmza@gmail.com",  // Correo del embajador
        foto     : "https://firebasestorage.googleapis.com/v0/b/rapishops-25.firebasestorage.app/o/CEUSERS%2FWhatsApp%20Image%202025-06-17%20at%2016.02.15.jpeg?alt=media&token=dd021e05-1aba-466a-8e10-306170d9a15d" // Foto
      }
    ];

    /*  ▸ Ejecuta Add_Captador para crear este nuevo embajador  */
    for (const embajador of embajadores) {
      await Add_Captador.run(embajador);
    }

    showAlert("Embajador creado con éxito 🎉", "success");
  }
}
