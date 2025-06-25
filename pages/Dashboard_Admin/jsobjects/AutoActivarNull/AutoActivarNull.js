export default {
  async ejecutar() {
    // 1. Obtiene todas las tiendas sin estado
    const result = await Get_Tiendas_SinEstado.run();

    const tiendas = result; // Array de documentos

    if (!tiendas.length) {
      showAlert("No hay tiendas con estado null", "info");
      return;
    }

    // 2. Para cada tienda, actualiza su estado a "activa"
    for (const tienda of tiendas) {
      await Update_Tienda.run({
        id: tienda._ref.id || tienda.id,
        nuevo_estado: "activa"
      });
    }

    // 3. Refresca los listados relevantes
    await Get_Tiendas_Activas.run();
    await Get_Tiendas_SinEstado.run();

    showAlert(`${tiendas.length} tienda(s) actualizada(s) a 'activa'`, "success");
  }
}
