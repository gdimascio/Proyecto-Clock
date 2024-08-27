import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export default function Signup() {

  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);



  function mailToUser(email){return email.split("@")[0]}


  // Manejo de envio de formulario
  const onSubmit = async data => {
    try {
      // POST al servidor con los datos del formulario
      const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });

      // Limpia los datos completados por el formulario
      setEmail('')
      setPassword('')

      // Error de respuesta del servidor
      if (!response.ok) {throw new Error ("Error en la solicitud")}

      // Procesar respuesta del servidor
      const result = await response.json();

      // Cambia 'email' para que tenga formato de 'user': user@gmail.com
      const user = mailToUser(result.perfil.email)

      // Actualiza el estado de user
      setUser(user)

      console.log("Respuesta del servidor:", result);
      } catch (error){
      console.error("Error al enviar los datos:", error);
      }
    };


    return (
      <div>
          <div className="user-div">
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
              <h3>Sign Up</h3>
              <input type="email" value={email} required placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" value={password} required placeholder="Password" {...register("password", {required: true})} onChange={(e)=>setPassword(e.target.value)}/>

              <div>
                {/* si el server devuelve el campo 'user' vacio, muestra el mensaje */}
                {user === '' ? <span>Ya existe un usuario con ese Email</span> : null}
                <button className="enviar-button button" type="submit">SIGN UP</button>
              </div>
              {/* si el server devuelve el campo 'user', redireccionar a /profile */}
              {user ? <Navigate to='/profile' replace={true} state={user}/> : null}
            </form>
          </div>
      </div>
    );
  }

