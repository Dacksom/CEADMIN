export default {
  async actualizarUsuarios() {
    // Definir los usuarios y sus actualizaciones
    const usuarios = [
      {
        id: "12312hhwhGJDOC21s",  // ID de Firestore
        estado: "Zulia",
        ciudad: "Maracaibo",
        telefono_familiar: "04127347266",
        direccion: "Torre Europa Avenida Bella Vista",
        telefono: "15614556261"
      },
      {
        id: "1BBIlM1Ggp7T8vWnaprF",
        estado: "Zulia",
        ciudad: "Maracaibo",
        telefono_familiar: "04127347266",
        direccion: "Torre Europa Avenida Bella Vista",
        telefono: "584129867423"
      },
      {
        id: "JwoPdM0UThEMjFj8nY05",
        estado: "Zulia",
        ciudad: "Maracaibo",
        telefono_familiar: "04127347266",
        direccion: "Torre Europa Avenida Bella Vista",
        telefono: "584127002872"
      },
      {
        id: "NOCYqdFjK5Jji5FUvrG5",
        estado: "Mérida",
        ciudad: "Ejido",
        telefono_familiar: "04147007077",
        direccion: "Ejido, Mérida",
        telefono: "04147007077"
      },
      {
        id: "RKGddsJJsnRlconxlien",
        estado: "Zulia",
        ciudad: "Maracaibo",
        telefono_familiar: "04127347266",
        direccion: "Torre Europa Avenida Bella Vista",
        telefono: "584123084572"
      },
      {
        id: "yUufDWeyWfHuIPN2tTtV",
        estado: "Zulia",
        ciudad: "Maracaibo",
        telefono_familiar: "04127347266",
        direccion: "Torre Europa Avenida Bella Vista",
        telefono: "584126507012"
      }
    ];

    // Actualizar cada usuario
    for (const usuario of usuarios) {
      await Update_User.run({
        id: usuario.id,  // ID de Firestore del usuario
        estado: usuario.estado,
        ciudad: usuario.ciudad,
        telefono_familiar: usuario.telefono_familiar,
        direccion: usuario.direccion,
        telefono: usuario.telefono
      });
    }

    showAlert("Usuarios actualizados con éxito", "success");
  }
}
