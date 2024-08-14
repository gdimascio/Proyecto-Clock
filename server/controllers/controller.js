
// CONEXION A FIREBASE
const db = require("../firebase/firebase");
const { doc } = require("firebase/firestore");

// CARGA DE COLECCIONES
const usersCollection = db.collection("usuarios");


exports.nose = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    

    // console.log(email, password);
    
    res.send({user: email})
// res.redirect(`/${userID}`);
}