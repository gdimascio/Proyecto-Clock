  import { useState } from 'react';
  import Signin from './pages/Signin'
  import Signup from './pages/Signup'

  export default function App() {

    // Estado para controlar qué página mostrar
    const [showSignin, setShowSignin] = useState(true); 

    return (
      <div>

        <div className='sign-div'>
          <div className='sign-btns'>
            <button onClick={() => setShowSignin(true)} className={`btn signin-btn ${showSignin ? 'active' : ''}`}>Sign In</button>
            <button onClick={() => setShowSignin(false)} className={`btn signup-btn ${!showSignin ? 'active' : ''}`}>Sign Up</button>

          </div>

          {showSignin ? <Signin/> : <Signup/>}

        </div>
      </div>
    )
  }