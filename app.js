// ===== Carrusel (Inicio) =====
const imgEl = document.getElementById('carouselImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Array de imágenes (zapatillas) - 
const IMAGENES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1200&auto=format&fit=crop'
];

let pos = 0;
function renderImg(){
  if(!imgEl) return;
  imgEl.src = IMAGENES[pos];
}
function next(){
  pos = (pos + 1) % IMAGENES.length; // circular
  renderImg();
}
function prev(){
  pos = (pos - 1 + IMAGENES.length) % IMAGENES.length; // circular hacia atrás
  renderImg();
}
if (imgEl){
  renderImg();
  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  // rotación automática cada 5s
  setInterval(next, 5000);
}

// ===== Validación del formulario (Contacto) =====
const form = document.getElementById('contactForm');
const resultado = document.getElementById('resultado');

function setError(id, msg){
  const small = document.querySelector(`[data-error-for="${id}"]`);
  if (small){ small.textContent = msg || ''; }
}

function validarEmail(valor){
  // regex suficiente para TP
  const re = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return re.test(valor);
}

function validarTelefono(valor){
  // Soporta +54, espacios y guiones. Requiere 7 a 15 digitos en total.
  const soloDigitos = valor.replace(/[^\d]/g, '');
  return soloDigitos.length >= 7 && soloDigitos.length <= 15;
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  // limpiar errores
  ['nombre','email','telefono','mensaje'].forEach(id => setError(id,''));

  const nombre = document.getElementById('nombre')?.value.trim() ?? '';
  const email = document.getElementById('email')?.value.trim() ?? '';
  const telefono = document.getElementById('telefono')?.value.trim() ?? '';
  const mensaje = document.getElementById('mensaje')?.value.trim() ?? '';

  let ok = true;

  if(!nombre){
    setError('nombre','El nombre es obligatorio');
    ok = false;
  } else if (nombre.length > 50){
    setError('nombre','Máximo 50 caracteres');
    ok = false;
  }

  if(!email){
    setError('email','El email es obligatorio');
    ok = false;
  } else if (!validarEmail(email)){
    setError('email','Formato de email inválido');
    ok = false;
  }

  if(!telefono){
    setError('telefono','El teléfono es obligatorio');
    ok = false;
  } else if (!validarTelefono(telefono)){
    setError('telefono','Entre 7 y 15 dígitos. Podés usar +54, espacios o guiones.');
    ok = false;
  }

  if(mensaje.length > 500){
    setError('mensaje','Máximo 500 caracteres');
    ok = false;
  }

  if(!ok) return;

  // Agregamos HTML mostrando los datos enviados
  if(resultado){
    const cont = document.createElement('div');
    cont.className = 'ok';
    cont.innerHTML = `<strong>Consulta recibida:</strong><br>
      Nombre: ${nombre}<br>
      Email: ${email}<br>
      Teléfono: ${telefono}<br>
      Mensaje: ${mensaje ? mensaje : '(sin mensaje)'}<br>`;
    resultado.prepend(cont);
  }

  form.reset();
});