export default {
  async eliminarYCrear() {
    // 1. Eliminar todas las tiendas
    await Eliminar_Tiendas.run(); // Elimina todos los documentos en la colección CETIENDAS

    // 2. Lista de tiendas a agregar con los nuevos datos
    const tiendas = [
      { nombre: "3 PUNTOS STORE", rif: "J503247207", captador_id: "CAP032" },
      { nombre: "DENTALEON", rif: "J500582790", captador_id: "CAP032" },
      { nombre: "PINTACASA BELLA VISTA", rif: "J401615449", captador_id: "CAP032" },
      { nombre: "HIGH MUSIC MCBO", rif: "J412859048", captador_id: "CAP032" },
      { nombre: "AUTOSPEED MCBO", rif: "J505372033", captador_id: "CAP032" },
      { nombre: "BLAAG STORE", rif: "V20583564", captador_id: "CAP032" },
      { nombre: "HOLA GUAPA", rif: "J502189769", captador_id: "CAP032" },

      { nombre: "SKNAILS_VE", rif: "J503385596", captador_id: "CAP031" },
      { nombre: "MEGA OPTICA (se fue con CASHEA)", rif: "J295420188", captador_id: "CAP031" },
      { nombre: "BTS,CA", rif: "J505644726", captador_id: "CAP031" },
      { nombre: "UNITEC PC C.A", rif: "J503468904", captador_id: "CAP031" },
      { nombre: "COLOR INSUMOS", rif: "J504144797", captador_id: "CAP031" },
      { nombre: "OPTIVISION PLUS C.A", rif: "J403070318", captador_id: "CAP031" },

      { nombre: "IGUANA SHOP", rif: "J070547987", captador_id: "CAP033" },
      { nombre: "E3GAMES", rif: "J504493562", captador_id: "CAP033" },
      { nombre: "MUNDO MODAS", rif: "J401934463", captador_id: "CAP033" },
      { nombre: "TECHNOPOWERLM", rif: "V25970812", captador_id: "CAP033" },
      { nombre: "AR STORE", rif: "V26907856", captador_id: "CAP033" },
      { nombre: "MC BOUTIQUE", rif: "V30139153", captador_id: "CAP033" },
      { nombre: "VARIEDADES GERIANNYS", rif: "V13208926", captador_id: "CAP033" }
    ];

    // 3. Crear las tiendas en Firestore
    for (const tienda of tiendas) {
      // Limpiar el RIF (eliminar guiones)
      const rifLimpio = tienda.rif.replace(/-/g, "").toUpperCase();

      // Ejecutar query para cada tienda y asignar el captador_id
      await Create_Tienda.run({
        nombre: tienda.nombre,
        rif: rifLimpio,  // RIF limpio, sin guiones
        captador_id: tienda.captador_id,  // Asignar el id del captador
        estado_actual: "pendiente_revision", // Establecer estado inicial
        fecha_creacion: moment().format("DD-MM-YYYY"),
        bonificaciones: { 1: 15, 10: 10, 25: 10, 50: 10 }
      });
    }

    showAlert("Todas las tiendas han sido eliminadas y cargadas con éxito", "success");
  }
}
