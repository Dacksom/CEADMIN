export default {
  async ejecutar() {
    // 1. Asegurarnos de que la query esté actualizada en el store
    await Get_Tiendas_Activas.run();

    // 2. Leer los datos desde el store
    const tiendas = Get_Tiendas_Activas.data || [];

    if (!tiendas.length) {
      showAlert("No hay aliados activos para actualizar.", "info");
      return;
    }

    for (const tienda of tiendas) {
      const idDoc     = tienda._ref.id;
      const idRapikom = tienda.id_rapikom;
      if (!idRapikom) continue;

      const resp = await RapikomAPI2.run({ id_aliado: idRapikom });
      const aliado = (resp.data && resp.data[0]) || null;
      if (!aliado) {
        showAlert(`Aliado Rapikom #${idRapikom} no encontrado.`, "warning");
        continue;
      }

      await Update_Tienda.run({
        id:        idDoc,
        direccion: aliado.direccion
      });
    }

    await Get_Tiendas_Activas.run();
    showAlert("Aliados activos actualizados con los datos de Rapikom.", "success");
  }
}
