
// CONEXION A FIREBASE
const db = require("../firebase/firebase");

// CARGA DE COLECCIONES
const usersCollection = db.collection("usuarios");

// Cambia 'email' para que tenga formato de 'user': user@gmail.com
function mailToUser(email){return email.split("@")[0]}

exports.signin = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    const user = mailToUser(email)

    // server devuleve 'user' o '' si password no coincide
    if(!userSnapshot.empty){
        userSnapshot.forEach(doc => {
            if(doc.data().pass == password) res.send({user: user})
                else res.send({user: ''})
        })
    } else res.send({user: ''})
}

exports.signup = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // Crea un nuevo perfil de usuario
    const newEmailDocRef = {email, password,cant_proy: "0"}
    await usersCollection.add(newEmailDocRef)

    res.send({email: email})
}