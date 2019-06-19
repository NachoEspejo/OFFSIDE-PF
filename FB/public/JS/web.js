console.log("dadsasadadasdadsaasdasds")


// Conexion con FireBase
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


// Funciones

function guardar(){

	var name = document.getElementById('nombre').value;
	var apell = document.getElementById('apellido').value;
	var dinero = document.getElementById('dinero').value;


	db.collection("jugadores").add({
    Nombre: name,
    Apellidos: apell,
	Dinero: dinero
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

db.collection("jugadores").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});test.firestore.js


