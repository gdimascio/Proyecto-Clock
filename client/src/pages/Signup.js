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
      // Despacha autenticacion a authSlice
      dispatch(signup({email, password}))

      // Limpia los datos completados por el formulario
      setEmail('')
      setPassword('')

      } catch (error){
      console.error("Error al enviar los datos:", error);
      }
    };


    return (
      <div>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="email" value={email} required placeholder="Mail" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" value={password} required placeholder="Password" {...register("password", {required: true})} onChange={(e)=>setPassword(e.target.value)}/>

          <div>
            <button className="enviar-btn btn" type="submit">SUBMIT</button>
          </div>
          {/* Mostrar mensaje de error si el correo ya existe */}
          {error ? <p>{error}</p> : null}
          {user ? <Navigate to='/profile' replace={true}/> : null}
        </form>
      </div>
    );
  }

