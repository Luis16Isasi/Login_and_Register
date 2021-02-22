import React, { useState } from 'react';
import clienteAxios from '../config/Axios';
import { Link, withRouter } from 'react-router-dom';

const Register = (props) => {
    const [datoRegister, setdatoRegister] = useState({
        usuario: '',
        contraseña: '',
        numero: '',
        email: '',
    });
    const [inputsValidos, setinputsValidos] = useState(1);

    //usando el usestate para leer los datos
    const leerdatosRegister = (e) => {
        setdatoRegister({
            ...datoRegister,
            [e.target.name]: e.target.value,
        });
    };
    //verificar el username y numero
    const validarUsuario = (e) => {
        const user = e.target.value;
        leerdatosRegister(e);
        setTimeout(() => {
            clienteAxios
                .get('/usuario')
                .then((data) => {
                    const userValido = data.data.find(
                        (usuario) => usuario.usuario === user
                    );
                    if (userValido) {
                        //cuando si existe
                        document.getElementById('userContent').style.border =
                            '1px solid red';
                        document.getElementById('userExistente').style.display =
                            'block';
                    } else {
                        //cuando no existe
                        document.getElementById('userContent').style.border =
                            '1px solid green';
                        document.getElementById('userExistente').style.display =
                            'none';
                        setinputsValidos(inputsValidos + 1);
                    }
                })
                .catch((error) => console.log(error));
        }, 2500);
    };

    //verificar que las contraseñas esten iguales desde confirmedpassword
    const confirmedPassword = (e) => {
        if (e.target.value === datoRegister.contraseña) {
            document.getElementById('password').style.border =
                '1px solid green';
            document.getElementById('confirmed password').style.border =
                '1px solid green';
            setinputsValidos(inputsValidos + 1);
        } else {
            document.getElementById('confirmed password').style.border =
                '1px solid red';
            document.getElementById('password').style.border = '1px solid red';
        }
    };

    //verificar el email
    const verificarEmail = (e) => {
        if (e.target.value.indexOf('@') !== -1) {
            document.getElementById('email').style.border = '1px solid green';
            leerdatosRegister(e);
            setinputsValidos(inputsValidos + 1);
        } else {
            document.getElementById('email').style.border = '1px solid red';
        }
    };

    const validarCheckbox = (e) => {
        const check = document.getElementById('checkTerminos');
        if (check.checked) {
            document.getElementById('terminos').style.textDecoration = 'none';
            document.getElementById('btnEnviarDatos').disabled = false;
            setinputsValidos(inputsValidos + 1);
        } else {
            document.getElementById('terminos').style.textDecoration =
                'underline red';
            document.getElementById('btnEnviarDatos').disabled = true;
        }
    };

    const enviarRegistro = (e) => {
        e.preventDefault();

        //enviando los datos a nuestra API por axios
        if (inputsValidos >= 4) {
            clienteAxios
                .post('/usuario', datoRegister)
                .then((respuesta) => {
                    alert('Registrado Correctamente');
                    props.history.push('/');
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <div id="login">
            <form onSubmit={enviarRegistro}>
                <figure>
                    <Link to={'/'} id="btnVolver">
                        <i className="fas fa-angle-left"></i>
                    </Link>
                    <img
                        src={process.env.PUBLIC_URL + '/imagenes/logo512.png'}
                        alt="Login con React"
                    />
                </figure>
                <div id="content-form">
                    <div
                        id="userContent"
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        <input
                            placeholder="username"
                            id="usuario"
                            name="usuario"
                            onChange={validarUsuario}
                            required
                        />
                        <span
                            id="userExistente"
                            style={{
                                display: 'none',
                                position: 'absolute',
                                marginTop: '45px',
                                color: 'red',
                                fontSize: '15px',
                            }}
                        >
                            El usuario ya existe
                        </span>
                    </div>
                    <div>
                        <input
                            placeholder="numero"
                            id="numero"
                            name="numero"
                            required
                            onChange={(e) => {
                                const num = document.getElementById('numero');
                                if (num.value.length > 0) {
                                    num.style.border = '1px solid green';
                                    leerdatosRegister(e);
                                } else {
                                    num.style.border = '1px solid red';
                                }
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="email address"
                            name="email"
                            id="email"
                            onChange={verificarEmail}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder="password"
                            type="password"
                            name="contraseña"
                            id="password"
                            onChange={leerdatosRegister}
                            required
                        />
                    </div>
                    <div>
                        <input
                            placeholder="confirmed password"
                            type="password"
                            name="contraseña"
                            id="confirmed password"
                            onChange={confirmedPassword}
                            required
                        />
                    </div>
                    <div
                        id="terminos"
                        style={{
                            background: 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0px',
                        }}
                    >
                        <input
                            type="checkbox"
                            required
                            id="checkTerminos"
                            onChange={validarCheckbox}
                            style={{
                                height: '23px',
                                width: '23px',
                            }}
                        />
                        <p
                            id="terminos"
                            style={{
                                marginTop: '17px',
                                marginLeft: '5px',
                            }}
                        >
                            Acepto los términos del acuerdo
                        </p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            id="btnEnviarDatos"
                            disabled
                            className="btn-success"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Register);
