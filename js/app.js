let btnEncriptar = document.querySelector("#encriptar");
let btnDesencriptar = document.querySelector("#desencriptar");
var inputTexto = document.querySelector("#texto");
var contenedorTexto = document.querySelector(".contenedor-texto");
var contenedorEsperando = document.querySelector(".contenedor-esperando");

var textoCodificado = document.querySelector("#mensaje");
var btnCopiar = document.querySelector('#copiar');

inputTexto.addEventListener('input', ()=>{
    if(inputTexto.value == ''){
        textoCodificado.innerHTML = '';
        btnCopiar.style.display = "none";
        contenedorEsperando.style.display = 'block';
    }
    var valor = inputTexto.value;
    valor = valor.replace(/[A-Z]/g, function(match) {
    return match.toLowerCase();
  });

  // Eliminar acentos de las letras
  valor = eliminarAcentos(valor);

  // Reemplazar cualquier carácter que no sea una letra minúscula por una cadena vacía
  valor = valor.replace(/[^a-z]/g, " ");

  // Actualizar el valor del input con la nueva cadena de texto
  inputTexto.value = valor;
});

// Función para eliminar acentos de las letras
function eliminarAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function encriptar() {
  var inputTexto = document.querySelector("#texto").value;
  var textoCifrado = inputTexto
    .replace(/e/gi, "enter")
    .replace(/i/gi, "imes")
    .replace(/a/gi, "ai")
    .replace(/o/gi, "ober")
    .replace(/u/gi, "ufat");
  textoCodificado.innerHTML = textoCifrado;
  contenedorTexto.style.display = "block";
  btnCopiar.style.display = 'block';
  contenedorEsperando.style.display = "none";
}

function desencriptar() {
  var inputTexto = document.querySelector("#texto").value;
  var textoCifrado = inputTexto
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");
  textoCodificado.innerHTML = textoCifrado;
  contenedorTexto.style.display = "block";
  btnCopiar.style.display = "block";
  contenedorEsperando.style.display = "none";
}
function copiarTexto(){
  // Obtener el elemento de texto
  var texto = textoCodificado;

  // Crear un rango de selección
  var rango = document.createRange();
  rango.selectNode(texto);

  // Seleccionar el rango
  window.getSelection().removeAllRanges(); // Limpiar selección previa
  window.getSelection().addRange(rango);

  // Copiar el texto seleccionado en el portapapeles del usuario
  document.execCommand("copy");

  // Desseleccionar el texto
  window.getSelection().removeAllRanges();

  // Mostrar un mensaje de confirmación
    Swal.fire({
      icon: "success",
      title: "Bien",
      text: "Texto copiado en el portapapeles",
      button: "OK",
    }).then(() => {
      setTimeout(() => {
        inputTexto.value = "";
        textoCodificado.innerHTML = "";
        btnCopiar.style.display = "none";
        contenedorEsperando.style.display = "block";
        window.location.reload();
      }, 1000);
    });
}
btnEncriptar.onclick = encriptar;
btnDesencriptar.onclick = desencriptar;
btnCopiar.onclick = copiarTexto;
