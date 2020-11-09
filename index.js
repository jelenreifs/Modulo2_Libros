const express = require("express");
const mongodb = require("mongodb");
const app = express();

let MongoClient = mongodb.MongoClient;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/* CONEXIÓN CON LA BASE DE DATOS */
let db;
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if(err!==null) {
        console.log(err);
    } else {
        db = client.db("libros");
    }
});


/* TODA LA COLECCIÓN DE LIBROS */
app.get("/api/libros", function(req, res) {
    db.collection("libros")
        .find()
        .toArray(function (err, datos) {
        if(err!=null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});


/* DEVOLVER EL LIBRO SOLICITADO */
app.get("/api/libros/:titulo", function (req, res) {
    let titulo = req.params.titulo

    db.collection("libros")
    
        .find({ "titulo" : `${titulo}`})
        .toArray(function (err, datos) {
        if(err!=null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});

/* AÑADIR UN LIBRO A LA COLECCIÓN */
app.post("/api/nuevoLibro/:titulo", function (req, res) {

 let libro = {
    titulo: req.params.titulo,
    estado: "sin leer"
}    
            
    db.collection("libros")
    .insertOne(libro, function (err, datos){
        if (err != null) {
            console.log(err);
     res.send(err);
         } else {
            console.log(data);
            res.send(datos);
        }
    });
});
    
/* MODIFICAR EL ESTADO DEL LIBRO */
app.put("/api/editarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;

  db.collection("libros").updateOne(
    { titulo: titulo },
    { $set: { estado: "leido" } },
    function (err, datos) {
      if (err !== null) {
        res.send(err);
         } else {
            console.log(datos);
            res.send(datos);
        }
    });
});
            
/* ELIMINAR UN LIBRO DE LA BASE DE DATOS */          
app.delete("/api/borrarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;
  const body = req.body;
    console.log(body);
    
    db.collection("libros")
        .deleteMany({ titulo : titulo }, function (err, datos) {
            if (err !== null) {
        res.send(err);
            } else {
            console.log(datos);
            res.send(datos);
        }
    });
});



app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          
