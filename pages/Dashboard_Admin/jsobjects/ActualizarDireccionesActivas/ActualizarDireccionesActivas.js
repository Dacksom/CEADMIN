export default {
  async ejecutar() {
    /* 1 ▸ Traer todas las tiendas activas */
    await Get_Tiendas_Activas.run();
    const tiendas = Get_Tiendas_Activas.data || [];

    if (!tiendas.length) {
      showAlert("No hay tiendas activas para revisar.", "info");
      return;
    }

    /* 2 ▸ Descargar UNA SOLA VEZ todo el catálogo Rapikom */
    const aliadosRapikom = await RapikomAPI.run();  // array completo
    if (!Array.isArray(aliadosRapikom) || !aliadosRapikom.length) {
      showAlert("Error: Rapikom no devolvió datos.", "error");
      return;
    }

    /* 3 ▸ Construir un mapa por RIF limpio => aliado */
    const mapRapikom = {};
    aliadosRapikom.forEach(a => {
      if (!a.rif) return;
      const rifKey = a.rif.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
      mapRapikom[rifKey] = a;
    });

    /* 4 ▸ Recorrer cada tienda y actualizar dirección */
    let actualizadas = 0;

    for (const t of tiendas) {
      const rifKey = t.rif.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
      const aliado = mapRapikom[rifKey];

      if (!aliado) {
        console.log(`RIF ${t.rif} no existe en Rapikom – se omite`);
        continue;
      }

      await Update_Tienda.run({
        id              : t._ref.id,
        direccion       : aliado.direccion,
        id_rapikom      : aliado.id_aliado || t.id_rapikom,
        cantidad_ventas : aliado.cantidad_ventas || t.cantidad_ventas
      });

      actualizadas += 1;
    }

    /* 5 ▸ Refrescar la vista y notificar */
    await Get_Tiendas_Activas.run();
    showAlert(
      `${actualizadas} tienda(s) activas sincronizadas con Rapikom.`,
      "success"
    );
  }
};
