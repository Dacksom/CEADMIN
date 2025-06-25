export default {
  async ejecutar() {
    await Get_Tiendas_Activas.run();
    const tiendas = Get_Tiendas_Activas.data || [];

    for (const t of tiendas) {
      const idDoc     = t._ref.id;
      let   idRapikom = t.id_rapikom;

      /* ‣ Mostrar lo que trae Firestore */
      console.log("↪️ Procesando:", t.nombre, "id_rapikom:", idRapikom);

      /* ① Si viene vacío o null, no podemos consultar Rapikom */
      if (!idRapikom) {
        console.log("⏭  Sin id_rapikom → se omite");
        continue;
      }

      /* Limpieza opcional: convertir a número y quitar ceros/espacios */
      idRapikom = String(idRapikom).trim().replace(/^0+/, "");

      /* ‣ Consultamos Rapikom */
      const { data: aliados = [] } = await RapikomAPI2.run({ id_aliado: idRapikom });
      console.log("🟢 Respuesta Rapikom:", aliados);

      const aliado = aliados[0];
      if (!aliado) {
        console.log("🔴 No encontrado en Rapikom → se omite");
        continue;
      }

      console.log("✍️  Actualizando dirección a:", aliado.direccion);

      /* Actualizamos Firestore */
      try {
        await Update_Tienda.run({
          id: idDoc,
          direccion: aliado.direccion,
          /* si quieres guardar también ciudad:
          ciudad: aliado.nombre_ciudad,
          */
        });
      } catch (e) {
        console.log("⚠️  Error al escribir:", e);
      }
    }

    await Get_Tiendas_Activas.run();
    showAlert("Proceso terminado; revisa consola para detalle.", "info");
  }
}
