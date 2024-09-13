
// CONEXION A FIREBASE
const db = require("../firebase/firebase");

// CARGA DE COLECCIONES
const usersCollection = db.collection("usuarios");
const projectsCollection = db.collection("usuarios").doc;


exports.signin = async(req,res) => {
    // ASIGNA USUARIO Y CONTRASEÑA DEL FORMULARIO
    const {email, password} = req.body;

    // Busca 'email' en usersCollection
    const userSnapshot = await usersCollection.where('email', '==', email).get();

    // Usuario NO existente
    if (userSnapshot.empty) {
        return res.status(400).send({ error: 'INCORRECTA' });
    }

    let projects = []

    // Devuelve el perfil de usuario
    for (const doc of userSnapshot.docs) {
        // Comprueba 'password' en usuario
        if(doc.data().pass != password) {
            res.status(400).send({ error: 'INCORRECTA' })
        } else {
            id = doc.id
            // Busca los proyectos en usuario si cant_proy > 0
            if (doc.data().cant_proy != 0){
                const projectsSnapshot = await usersCollection.doc(doc.id).collection("proyectos").get();
                if (!projectsSnapshot.empty) {
                    projects = projectsSnapshot.docs.map(docProj => ({
                        id: docProj.id,
                        ...docProj.data()
                    }))
                }
            }

            res.send({email: email, id: id, projects: projects})
        }


    }
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
    res.send({email: email, id: id})
}