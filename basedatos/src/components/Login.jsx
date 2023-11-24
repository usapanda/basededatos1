import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState(''); // Estado para el campo de usuario
  const [clave, setClave] = useState(''); // Estado para el campo de clave
  let navigate = useNavigate();

  const handleRegistroClick = () => {
    return navigate("/register");
  };

  const handleIniciarSesionClick = () => {
    // Realiza las operaciones necesarias con usuario y clave
    console.log("Usuario:", usuario);
    console.log("Clave:", clave);
    if(usuario == "admin" && clave == "abc123"){

    // Redirige a la página de dashboard
    return navigate("/dashboard");
    }
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>

      <div>
        <MDBInput
          label='Usuario'
          id='usuario'
          type='text'
          size='lg'
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br />
        <MDBInput
          label='Clave'
          id='clave'
          type='password' // Cambiado a type 'password' para ocultar la clave
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <br />
      </div>

      <MDBBtn onClick={handleRegistroClick}>Registrarse</MDBBtn>
      <MDBBtn className='ms-3' id="iniciarSesionBtn" onClick={handleIniciarSesionClick}>
        Iniciar sesión
      </MDBBtn>
    </div>
  );
}
