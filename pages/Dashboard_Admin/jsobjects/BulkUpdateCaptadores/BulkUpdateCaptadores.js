export default {
  async run() {
    const captadores = Get_Captadores.data;
    let actualizados = 0;
    let saltados = 0;
    for (let cap of captadores) {
      let estado = "Zulia";
      let ciudad = "Maracaibo";
      if (
        cap.correo === "nairetmza@gmail.com" ||
        cap.codigo_usuario === "CAP034"
      ) {
        estado = "Merida";
        ciudad = "Ejido";
      }
      // Validación estricta
      if (!cap._ref || !cap._ref.id || !estado || !ciudad) {
        console.warn('Saltado (sin _ref.id, estado o ciudad):', cap);
        saltados++;
        continue;
      }
      try {
        console.log('Intentando actualizar:', cap._ref.id, 'estado:', estado, 'ciudad:', ciudad);
        await Update_Captador.run({
          docId: cap._ref.id,
          estado: estado,
          ciudad: ciudad
        });
        actualizados++;
      } catch (e) {
        console.error('Error actualizando', cap._ref.id, e);
      }
    }
    showAlert(`¡Actualización masiva finalizada! Actualizados: ${actualizados}, saltados: ${saltados}`, 'info');
    return true;
  }
}
