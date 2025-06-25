export default {
  async cambiarEstadoTienda(nuevo_estado, mensaje, tipo_alerta) {
    const id = appsmith.store.tiendaSeleccionada._ref.id;
    const comentario = InputComentario.text.trim();

    await Update_Tienda.run({
      id: id,
      nuevo_estado: nuevo_estado,
      comentario: comentario
    });

    // Refrescar queries
    Get_Tiendas_Revisar.run();
    Get_Tiendas_Induccion.run();
    Get_Tiendas_Rechazadas.run();
		Get_Tiendas_PorActivar.run();
    Get_Tiendas_Activas.run();

    // Cerrar modal y mostrar mensaje
    closeModal("ModalDetalleTienda");
    showAlert(mensaje, tipo_alerta);
  }
};
