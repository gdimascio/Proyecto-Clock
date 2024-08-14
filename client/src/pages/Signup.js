import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export default function Signup() {

    const { register, handleSubmit } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);


  // Manejo de envio de formulario
    const onSubmit = async data => {
    try {
      // POST al servidor con los datos del formulario
      const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });

      // Error de respuesta del servidor
      if (!response.ok) {
      throw new Error ("Error en la solicitud")
      }

      // Procesar respuesta del servidor
      const result = await response.json();
        
      // Limpia el formulario
      setEmail('')
      setPassword('')

      // Actualiza el estado de user
      setUser(result.user)

      console.log("Respuesta del servidor:", result);
      } catch (error){
      console.error("Error al enviar los datos:", error);
      }
    };

    // Maneja el estado de 'user' al cambiar
    useEffect(() => {
      if (user) {
        console.log("User:", user)
      }
    }, [user])


    return (
        <div>

            <div className="user-div">
              <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Sign Up</h3>
                <input type="email" value={email} required placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} required placeholder="Password" {...register("password", {required: true})} onChange={(e)=>setPassword(e.target.value)}/>

                <div>
                    <button className="enviar-button button" type="submit">SIGN UP</button>
                </div>
                {user ? <Navigate to='/profile' replace={true} state={user}/> : null}
              </form>
            </div>

        </div>


    );
}

