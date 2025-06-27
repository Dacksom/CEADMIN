export default {
  // Cambiar el estado de la tienda y guardar comentario
  async cambiarEstadoTienda(nuevo_estado, mensaje, tipo_alerta) {
    const id = appsmith.store.tiendaSeleccionada._ref.id;
    const comentario = InputComentario.text;
    // Actualiza estado y comentario en Firestore
    await Update_Tienda.run({
      id: id,
      nuevo_estado: nuevo_estado,
      comentario: comentario
    });

    // Refresca las listas (queries)
    Get_Tiendas_Revisar.run();
    Get_Tiendas_Induccion.run();
    Get_Tiendas_Rechazadas.run();
    Get_Tiendas_PorActivar.run();
    Get_Tiendas_Activas.run();

    // Cierra el modal y muestra notificación
    closeModal("ModalDetalleTienda");
    showAlert(mensaje, tipo_alerta);
  },

  // Solo guarda el comentario, SIN cambiar el estado
  async guardarComentarioYCerrar() {
    const id = appsmith.store.tiendaSeleccionada._ref.id;
    const comentarioNuevo = InputComentario.text;
    const comentarioOriginal = appsmith.store.tiendaSeleccionada.comentario_admin || "";
    const estadoActual = appsmith.store.tiendaSeleccionada.estado_actual;

    // Si el comentario cambió (aunque sea un espacio), guarda
    if (comentarioNuevo !== comentarioOriginal) {
      await Update_Tienda.run({
        id: id,
        comentario: comentarioNuevo,
        nuevo_estado: estadoActual
      });
      showAlert("Comentario guardado correctamente.", "success");
    }
    closeModal("ModalDetalleTienda");
  }
};
