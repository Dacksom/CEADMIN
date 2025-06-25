export default {
  obtenerNombre: (codigo) => {
    const captadores = Get_Captadores.data;
    const captador = captadores.find(c => c.codigo_usuario === codigo);
    return captador ? captador.nombre : "Desconocido";
  }
}
