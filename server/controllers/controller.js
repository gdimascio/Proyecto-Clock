
// CONEXION A FIREBASE
const db = require("../firebase/firebase");

// CARGA DE COLECCIONES
const usersCollection = db.collection("usuarios");


exports.signin = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // Usuario NO existente
    if (userSnapshot.empty) {
        // Si NO existe un usuario con ese correo, devolver un mensaje de error
        return res.status(400).send({ error: 'INCORRECTA' });
    }

    // Devuelve el perfil de usuario
    userSnapshot.forEach(doc => {
        if(doc.data().pass == password) res.send({email: email})
            else res.status(400).send({ error: 'INCORRECTA' });
    })
}



exports.signup = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // Usuario Ya existente
    if (!userSnapshot.empty) {
        // Si ya existe un usuario con ese correo, devolver un mensaje de error
        return res.status(400).send({ error: 'EXISTENTE' });
    }

    // Crea un nuevo perfil de usuario
    const newEmailDocRef = {email, password,cant_proy: "0"}
    await usersCollection.add(newEmailDocRef)
    res.send({email: email})
}