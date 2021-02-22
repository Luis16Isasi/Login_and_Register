import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import './styles/Login.css';
import Swal from 'sweetalert2';

const Login = (props) => {
    //generar un state para los datos del login
    const [dataLogin, setdataLogin] = useState({
        usuario: '',
        contraseña: '',
    });

    //leer los datos del formulario para el login
    const leerdatalogin = (e) => {
        setdataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    //enviar los datos a la api y buscar el usuario
    const verificarUsuario = (e) => {
        e.preventDefault();
        const user = e.target.usuario.value;
        const pass = e.target.contraseña.value;
        //validando el formulario de usuario y password
        if (!user || !pass) {
            Swal.fire({
                title:
                    'UPS! Todos los espacios deben ser llenados obligatoriamente',
                showClass: {
                    popup: 'animated fadeInDown faster',
                },
                hideClass: {
                    popup: 'animated fadeOutUp faster',
                },
            });
        } else {
            clienteAxios
                .get(`/usuario`)
                .then((respuesta) => {
                    const data = respuesta.data.find(
                        (usuario) =>
                            usuario.usuario === user &&
                            usuario.contraseña === pass
                    );
                    if (data) {
                        //actualizamos los usuarios
                        clienteAxios
                            .get('/usuario')
                            .then((usuarios) => {
                                props.setUsuarios(usuarios.data);
                            })
                            .catch((error) => console.log(error));

                        //redireccionar a otro path con
                        localStorage.setItem('sesionid', `${data._id}`);
                        props.history.push(`/usuario/${data._id}`);
                    } else {
                        Swal.fire({
                            title:
                                'Verifica que este correctamente escrito tu usuario y contraseña',
                            showClass: {
                                popup: 'animated fadeInDown faster',
                            },
                            hideClass: {
                                popup: 'animated fadeOutUp faster',
                            },
                        });
                    }
                })
                .catch((e) => console.log(e));
        }
    };
    if (localStorage.getItem('sesionid')) {
        const id = localStorage.getItem('sesionid');
        props.history.push(`/usuario/${id}`);
        return null;
    } else {
        return (
            <div id="login">
                <form onSubmit={verificarUsuario}>
                    <figure>
                        <img
                            src={
                                process.env.PUBLIC_URL + '/imagenes/logo512.png'
                            }
                            alt="Login con React"
                        />
                    </figure>
                    <div id="content-form">
                        <div>
                            <i className="fas fa-user"></i>
                            <input
                                placeholder="Usuario"
                                name="usuario"
                                onChange={leerdatalogin}
                            />{' '}
                            <br />
                        </div>
                        <div>
                            <i className="fas fa-lock"></i>
                            <input
                                placeholder="Contraseña"
                                name="contraseña"
                                onChange={leerdatalogin}
                                type="password"
                            />{' '}
                            <br />
                        </div>
                        <div id="submit">
                            <button type="submit" className="btn-success">
                                Login
                            </button>
                        </div>
                        <div id="register">
                            <Link to={'/register'}>
                                <b>Register Here!</b>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default withRouter(Login);
