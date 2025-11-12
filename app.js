// ===== Carrusel (Inicio) =====
var imgEl = document.getElementById('carouselImg');
var btnPrev = document.getElementById('prevBtn');
var btnNext = document.getElementById('nextBtn');

// lista de imagenes (zapatillas)
var imagenes = [
  "img/zapas1.jpg",
  "img/zapas2.jpg",
  "img/zapas3.jpg",
  "img/zapas4.jpg",
  "img/zapas5.jpg"
];

let indice = 0;

// muestra la imagen actual
function mostrarImagen() {
  if (!imgEl || imagenes.length === 0) return; // por si falta algo
  imgEl.src = imagenes[indice];
  imgEl.alt = "Foto " + (indice + 1) + " del carrusel";
}

// siguiente
function siguiente() {
  indice = indice + 1;
  if (indice >= imagenes.length) {
    indice = 0; // vuelve al principio (circular)
  }
  mostrarImagen();
}

// anterior
function anterior() {
  indice = indice - 1;
  if (indice < 0) {
    indice = imagenes.length - 1; // va a la ultima (circular)
  }
  mostrarImagen();
}

// inicio del carrusel
if (imgEl) {
  mostrarImagen();
  if (btnNext) {
    btnNext.addEventListener('click', function () {
      siguiente();
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      anterior();
    });
  }
  // cambio automatico cada 5 segundos
  setInterval(function () {
    siguiente();
  }, 5000);
}

// ===== Validacion del formulario (Contacto) =====
var form = document.getElementById('contactForm');
var resultado = document.getElementById('resultado');

// pone o borra el mensaje de error chiquito
function ponerError(idCampo, mensaje) {
  var elemError = document.querySelector('[data-error-for="' + idCampo + '"]');
  if (elemError) {
    // si mensaje viene vacío, borro el texto
    elemError.textContent = mensaje ? mensaje : '';
  }
}

// email mas o menos estandar (para el TP esta bien)
function esEmailValido(texto) {
  var re = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return re.test(texto);
}

// telefono: permito +54, espacios y guiones, entre 7 y 15 digitos reales
function esTelefonoValido(texto) {
  var soloDigitos = texto.replace(/[^\d]/g, '');
  return soloDigitos.length >= 7 && soloDigitos.length <= 15;
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // limpio errores antes de validar
    ponerError('nombre', '');
    ponerError('email', '');
    ponerError('telefono', '');
    ponerError('mensaje', '');

    // tomo valores (si no hay, dejo cadena vacia)
    var nombre = (document.getElementById('nombre') && document.getElementById('nombre').value) ? document.getElementById('nombre').value.trim() : '';
    var email = (document.getElementById('email') && document.getElementById('email').value) ? document.getElementById('email').value.trim() : '';
    var telefono = (document.getElementById('telefono') && document.getElementById('telefono').value) ? document.getElementById('telefono').value.trim() : '';
    var mensaje = (document.getElementById('mensaje') && document.getElementById('mensaje').value) ? document.getElementById('mensaje').value.trim() : '';

    var todoOk = true;

    // nombre
    if (nombre === '') {
      ponerError('nombre', 'El nombre es obligatorio');
      todoOk = false;
    } else if (nombre.length > 50) {
      ponerError('nombre', 'Máximo 50 caracteres');
      todoOk = false;
    }

    // email
    if (email === '') {
      ponerError('email', 'El email es obligatorio');
      todoOk = false;
    } else if (!esEmailValido(email)) {
      ponerError('email', 'Formato de email invalido');
      todoOk = false;
    }

    // telefono
    if (telefono === '') {
      ponerError('telefono', 'El telefono es obligatorio');
      todoOk = false;
    } else if (!esTelefonoValido(telefono)) {
      ponerError('telefono', 'Entre 7 y 15 digitos. Podés usar +54, espacios o guiones.');
      todoOk = false;
    }

    // mensaje (opcional pero con límite)
    if (mensaje.length > 500) {
      ponerError('mensaje', 'Maximo 500 caracteres');
      todoOk = false;
    }

    if (!todoOk) {
      return; // si hay algo mal, no sigo
    }

    // muestro los datos enviados arriba de todo
    if (resultado) {
      var caja = document.createElement('div');
      caja.className = 'ok';

      caja.innerHTML =
        '<strong>Consulta recibida:</strong><br>' +
        'Nombre: ' + nombre + '<br>' +
        'Email: ' + email + '<br>' +
        'Teléfono: ' + telefono + '<br>' +
        'Mensaje: ' + (mensaje !== '' ? mensaje : '(sin mensaje)') + '<br>';
      resultado.prepend(caja);
    }

    form.reset(); // limpio el formulario
  });
}