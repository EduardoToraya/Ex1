
/*
1. Función que muestra y esconde la sección para hacer comentarios
   al hacer click el botón 'Escribe una reseña'.
   on click!
   (5 puntos)
*/

let escribe_reseña = document.getElementById('escribe_reseña');
let seccion_comentario = document.getElementById('seccion_comentario');

escribe_reseña.addEventListener("click", function(){
  seccion_comentario.classList.remove("hidden");
})


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml
  (función ajax, 25 puntos)
*/

  $.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data){
  console.log(data);

  let new_html = ''

  $(data).find("comment").each(function(event) {
        let stars = $("input[name='rating']:checked").val()
        new_html += `
        getStarsSpans(stars)
        <tr>
          <td>${$(this).find("name").text()}</td>
          <td>${$(this).find("date").text()}</td>
          <td>${$(this).find("text").text()}</td>
        </tr>

        `;
      });

      $("#seccion_reviews").append(new_html);
  },
  error: function(errorMsg){
    console.log(errorMsg);
  }
})




/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/


let btn_publicar = document.getElementById('btn_publicar')



var parent = document.getElementById("seccion_reviews");

btn_publicar.addEventListener("click", function(){

  let nombre = document.getElementById('nombre')
  let email = document.getElementById('email')
  let comentario = document.getElementById('comentario')
  let error_comment = document.getElementById("error_comment")

  if(nombre.value != "" && email.value != "" && comentario.value != ""){
    let div = document.createElement('div');
    error_comment.textContent = ""

    div.innerHTML = `
      <input type="text" name="name" value= ${nombre.value} />
      <input type="text" name="value" value= ${email.value} />
      <input type="text" name="value" value= ${comentario.textContent} />
    `;

    parent.appendChild(div);
    nombre.value = "";
    email.value = "";
    comentario.textContent = "";
  }
  else{
    error_comment.textContent = "Para poder dejar una reseña es necesario llenar el nombre y un comentario"
  }
})

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/

let btn_limpiar = document.getElementById('btn_limpiar')


let nombre = document.getElementById('nombre')
let email = document.getElementById('email')
let comentario = document.getElementById('comentario')

btn_limpiar.addEventListener("click", function(){

  nombre.value = "";
  email.value = "";
  comentario.textContent = "";


})


/*
Funcion que recibe un numero de stars y regresa los 5 spans
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
