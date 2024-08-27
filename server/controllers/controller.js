
// CONEXION A FIREBASE
const db = require("../firebase/firebase");

// CARGA DE COLECCIONES
const usersCollection = db.collection("usuarios");



exports.signin = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // server devuleve 'user' o '' si password no coincide
    if(!userSnapshot.empty){
        userSnapshot.forEach(doc => {
            if(doc.data().pass == password) res.send({perfil: doc.data()})
                else res.send({perfil: ''})
        })
    } else res.send({perfil: ''})
}

exports.signup = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // server devuleve '' si ya existe ese email
    if(!userSnapshot.empty) res.send({perfil: ''})
        else {
            // Crea un nuevo perfil de usuario
            const newEmailDocRef = {email, password,cant_proy: "0"}
            await usersCollection.add(newEmailDocRef)

            res.send({perfil: newEmailDocRef})

            //
            // HAY QUE MODIFICAR EL CLIENTE PARA QUE SE ENCARGUE DE CONVERTIR EMAIL A USER.
            // Y HAY QUE PASARLE res.send({newEmailDocRef}) EN VEZ DE user: user
            //
        }

    
}