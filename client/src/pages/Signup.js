import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/authSlice';

export default function Signup() {

  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();


  // Manejo de envio de formulario
  const onSubmit = async data => {
    try {
      dispatch(signup({email, password}))

      // Limpia los datos completados por el formulario
      setEmail('')
      setPassword('')

      // Error de respuesta del servidor
      // if (!response.ok) {throw new Error ("Error en la solicitud")}

      // Procesar respuesta del servidor
      // const result = await response.json();

      // console.log("Respuesta del servidor:", result);
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
                <button className="enviar-button button" type="submit">SIGN UP</button>
              </div>
              {/* si el server devuelve el campo 'user', redireccionar a /profile */}
              {error ? <p>{error}</p> : null}
              {user ? <Navigate to='/profile' replace={true}/> : null}
            </form>
          </div>
      </div>
    );
  }

