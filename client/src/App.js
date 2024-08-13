import { useState } from 'react';
import axios from 'axios';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = e => {
    axios.post('http://localhost:3001/login', {username: username, password: password})
    .then((data) => {
      console.log(data)
      setUsername('')
      setPassword('')
    })
  }


  return (
        <div className="user-div">
          <form className="user-form" onSubmit={submitHandler}>
              <input type="email" name="email" id="email" value={username} required placeholder="Mail" onChange={(e) => setUsername(e.target.value)}/>
              <input type="password" name="pass" id="pass" value={password} required placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

              <div>
                  <button className="enviar-button button" type="submit">SEND</button>
              </div>
          </form>
        </div>

  );
}

export default App;
