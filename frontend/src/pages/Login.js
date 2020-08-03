import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';

const Login = () => {
    const defaultFormulario = {
        userName: '',
        password: ''
    }
    const [formulario, setFormulario] = useState(defaultFormulario);

    const onSubmit = async(e) => {
        e.preventDefault();
        const login = await Axios.post("http://127.0.0.1:3003/api/user/login", formulario);
        console.log(login)
        if (login.data.ok) {
            localStorage.setItem('usuario', login.data.user.id);
            localStorage.setItem('token', login.data.token);
            window.location.href="/contactos"
        } else {
            alert(login.data.message);
        }
    }

    function onInputChange(e){
        setFormulario({...formulario, [e.target.name]: e.target.value})
    }
    return(
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Inicio de sesión</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input type="text" className="form-control" value={formulario.userName} name="userName" onChange={onInputChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" value={formulario.password} name="password" onChange={onInputChange} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </form>
                </div>
                <button className="btn btn-warning" onClick={()=>{ window.location.href="/" }}> Registrar </button>
            </div>
        </div>
    )
}

export default Login;