export default {
  abrirModalImagen: (url) => {
    storeValue("imagenSeleccionada", url);
    showModal("ModalImagenAmpliada");
  }
}
