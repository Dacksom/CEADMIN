export default {
  async ejecutar(idDoc, rif) {
    // 1. Traer lista de aliados
    const aliados = await RapikomAPI.run();
    const rifBusca = rif.trim().toUpperCase();

    // 2. Buscar por RIF
    const aliado = aliados.find(
      a => a.rif.trim().toUpperCase() === rifBusca
    );

    // 3-A. Si NO existe → queda pendiente y solo alerta
    if (!aliado) {
      showAlert(
        `RIF ${rif} no existe en Rapikom. Verifica y vuelve a intentar.`,
        "warning"
      );
      return;   // No toca Firestore
    }

    // 3-B. Si existe → pasa a ACTIVA y guarda datos extra
    await Update_Tienda.run({
      id              : idDoc,
      nuevo_estado    : "activa",
      comentario      : "",
      id_rapikom      : aliado.id_aliado,
      direccion       : aliado.direccion,
      cantidad_ventas : aliado.cantidad_ventas
    });

    // 4. Refresca listas
    await Get_Tiendas_PorActivar.run();
    await Get_Tiendas_Activas.run();

    showAlert(
      `Tienda activada (#${aliado.id_aliado}) – Ventas iniciales: ${aliado.cantidad_ventas}`,
      "success"
    );
  }
};
