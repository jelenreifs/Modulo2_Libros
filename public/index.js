showLibros();
function showLibros() {
  fetch("/api/libros")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libros = "";
      for (let i = 0; i < datos.length; i++) {
        libros += `
            <div class="libro">
                <p>Color: ${datos[i].titulo}</p>
                <p>Tamaño: ${datos[i].estado}</p>
            </div>
        
        `;
      }
      document.getElementById("resultado").innerHTML = libros;
    });
}


let libro;
function buscarLibro() {
    let buscaLibro = document.getElementById("libroSearch").value
    
  fetch(`/api/libros/${buscaLibro}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {
        libro = `
            <div class="libro">
                <p>Color: ${datos[i].titulo}</p>
                <p>Tamaño: ${datos[i].estado}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = libro;
        
    });
}

let libroNuevo;
function addLibro() {
    let libroAdd = document.getElementById("libroAdd").value

    let libro = {
        titulo,
        rdtado
    }

    fetch(`/api/nuevoLibro/${libroAdd}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(libro),
    })

    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {
            libroNuevo = `
              <div class="mensaje">
                <p>Su libro se ha añadido</p>
            </div>
            <div class="libro">
                <p>Color: ${datos[i].titulo}</p>
                <p>Tamaño: ${datos[i].estado}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = libroNuevo;
        
    });
}


let libroEditar;
function editLibro() {
    let libroEdit = document.getElementById("libroEdit").value

    let estado = document.getElementById('estado');
        selectedOption = estado.options[estado.selectedIndex].value;
        console.log(selectedOption);
    
    fetch(`/api/editarLibro/${libroEdit}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {
            libroEditar = `
              <div class="mensaje">
                <p>Su libro se ha editado</p>
            </div>
            <div class="libro">
                <p>Color: ${datos[i].titulo}</p>
                <p>Tamaño: ${datos[i].estado}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = libroEditar;
        
    });
}


let libroBorrar;
function deleteLibro() {
    let libroDelete = document.getElementById("libroDelete").value
    
    fetch(`/api/borrarLibro/${libroDelete}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
        console.log(datos);
        for (let i = 0; i < datos.length; i++) {
            libroEditar = `
              <div class="mensaje">
                <p>El libro  ${datos[i].titulo} ha sido eliminado </p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = libroEditar;
        
    });
}



