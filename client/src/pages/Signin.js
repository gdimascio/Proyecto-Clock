import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Signin() {

    const { register, handleSubmit } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

      // Limpia el formulario
        setEmail('')
        setPassword('')

      // Error de respuesta del servidor
        if (!response.ok) {
        throw new Error ("Error en la solicitud")
        }

      // Procesar respuesta del servidor
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        } catch (error){
        console.error("Error al enviar los datos:", error);
        }
    }


    return (
        <div>

            <div className="user-div">
            <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
              <h3>Sign In</h3>
              <input type="email" value={email} required placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" value={password} required placeholder="Password" {...register("password", {required: true})} onChange={(e)=>setPassword(e.target.value)}/>

              <div>
                  <button className="enviar-button button" type="submit">SIGN IN</button>
              </div>
            </form>
            </div>

        </div>


    );
}

