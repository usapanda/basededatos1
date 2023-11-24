import React from "react";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

export default function Register(){
    let navigate = useNavigate();

    return(
        <div>
            <div className="login-form">
        <h2>Registrarse</h2>

        <div>
          <MDBInput label='Primer nombre' id='pNombre' type='text' size='lg' />
          <br />
          <MDBInput label='Segundo nombre' id='sNombre' type='text' />
          <br />
          <MDBInput label='Usuariouaio' id='clave' type='text' />
          <br />
          <MDBInput label='Clave' id='clave' type='text' />
          <br />
        </div>

        <MDBBtn onClick={() => {}}>Registrarse</MDBBtn>
        <MDBBtn className='ms-3' id="iniciarSesionBtn" onClick={() => navigate('/')}>
          Atras
        </MDBBtn>

      </div>
        </div>
    )
}