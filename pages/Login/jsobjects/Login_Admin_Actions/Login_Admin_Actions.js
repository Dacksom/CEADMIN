export default {
  iniciarSesion: async () => {
    const codigo = input_codigo.text.trim();
    const clave = input_contrasena.text.trim();

    if (!codigo || !clave) {
      showAlert("Debes ingresar tu código de usuario y contraseña", "warning");
      return;
    }

    await Login_Query.run();
    const data = Login_Query.data;

    if (data.length > 0) {
      const usuario = data[0];

      if (!usuario.activo) {
        showAlert("El usuario no está activo. Por favor comuníquese con Rapikom.", "warning");
        return;
      }

      if (usuario.rol !== "admin") {
        showAlert("Estás intentando acceder desde la app de administradores. Si eres captador, usa la otra app.", "error");
        return;
      }

      storeValue("usuario", usuario);
      showAlert("Inicio de sesión exitoso", "success");
      navigateTo("Dashboard_Admin");
    } else {
      showAlert("Credenciales incorrectas", "error");
    }
  }
};
