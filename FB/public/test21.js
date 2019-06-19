// CREDENCIALES Y CONEXION
firebase.initializeApp({
    apiKey: "AIzaSyCJPM-Kav1jp-AemGJzjjEtTcxsoxgqeP4",
    authDomain: "intermalaga-c.firebaseapp.com",
    databaseURL: "https://intermalaga-c.firebaseio.com",
    projectId: "intermalaga-c",
    storageBucket: "intermalaga-c.appspot.com",
    messagingSenderId: "336681979057",
    appId: "1:336681979057:web:d57e918f6a7e200c"
});

var db = firebase.firestore();


// FUNCIONES
function guardar() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dinero = document.getElementById('dinero').value;

    db.collection("jugadores").add({
        nombre: nombre,
        apellido: apellido,
        dinero: dinero
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

    var tabla = document.getElementById('table');
    db.collection("jugadores").get().then((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().nombre}`);
            tabla.innerHTML += `<tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().dinero}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                <td><button class="btn btn-warning" onclick="modificar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().dinero}')">Modificar</button></td>
                <td><button id="grafica" onclick="crear('${doc.data().dinero}')">Gráfica</button></td>
              </tr>
                `
        });
    });

}

function eliminar(id) {

    db.collection("jugadores").doc(id).delete().then(function () {
        var tabla = document.getElementById('table');
        db.collection("jugadores").get().then((querySnapshot) => {
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().nombre}`);
                tabla.innerHTML += `<tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().dinero}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" id="boton" onclick="modificar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().dinero}')">Modificar</button></td>
        <td><button id="grafica" onclick="crear('${doc.data().dinero}')">Gráfica</button></td>
      </tr>
        `
            });
        });
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}

function modificar(id, nombre, apellido, dinero) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('dinero').value = dinero;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Modificar';
    console.log("RESULTADO")
    console.log(id)
    console.log(nombre)

    boton.onclick = function () {
        var washingtonRef = db.collection("jugadores").doc(id);
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var dinero = document.getElementById('dinero').value;

        return washingtonRef.update({
            nombre: nombre,
            apellido: apellido,
            dinero: dinero
        })
            .then(function () {
                db.collection("jugadores").get().then((querySnapshot) => {
                    tabla.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().nombre}`);
                        tabla.innerHTML += `<tr>
                        <td>${doc.data().nombre}</td>
                        <td>${doc.data().apellido}</td>
                        <td>${doc.data().dinero}</td>
                        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                        <td><button class="btn btn-warning" onclick="modificar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().dinero}')">Modificar</button></td>
                        <td><button id="grafica" class="btn btn-info" onclick="crear('${doc.id}','${doc.data().dinero}')">Gráfica</button></td>
                      </tr>
                        `
                    });
                });
                boton.innerHTML = 'Guardado'
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            })
    }
}

function crear(id) {

    var node = document.createElement("TD");
    var x = document.createElement("PROGRESS");
    x.setAttribute("value", id);
    x.setAttribute("max", "100");
    node.appendChild(x);
    document.getElementById("grafica").appendChild(node);

}

// MUESTRA LOS DATOS DE FB
var tabla = document.getElementById('table');
db.collection("jugadores").get().then((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `<tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().dinero}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="modificar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().dinero}')">Modificar</button></td>
        <td><button id="grafica" onclick="crear('${doc.data().dinero}')">Gráfica</button></td>
      </tr>
        `
    });
});


<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-messaging.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.9.1/firebase-functions.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase-firestore.js"></script>

