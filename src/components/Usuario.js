import React from 'react';
import {withRouter} from 'react-router-dom';


const Usuario = (props) => {
    const sesionid = localStorage.getItem('sesionid');
    
    const cerrarSesion = () => {
        localStorage.clear();
        props.history.push('/');
    }
    if( !sesionid ){
        props.history.push('/');
        return null;
    }

    return(
        <div id="login">
            <div id="contentUsuario">
                <h1>Hola {props.usuario.usuario}</h1>
                <div>
                    <p><b>Numero:</b> {props.usuario.numero}</p>
                    <p><b>Email:</b> {props.usuario.email}</p>
                </div>

                <div>
                    <button className="btn-warning" onClick={cerrarSesion}>Sign off</button>
                </div>
            </div>

        </div>
    )

}

export default withRouter(Usuario);