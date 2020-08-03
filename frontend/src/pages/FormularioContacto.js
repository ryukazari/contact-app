import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import { useApiContext } from '../context/ApiContext';

const FormularioContacto = (props) => {
    const { tipos, getTipos } = useApiContext();
    const defaultFormulario = {
        name: '',
        email: '',
        phone: '',
        type: '5f284e227c213e3efe152a28'
    }
    const [formulario, setFormulario] = useState(defaultFormulario);
    const [editing, setEditing] = useState(false);
    const { id } = props.match.params;
    useEffect(() => {
        getTipos();
        if (id){
          setEditing(true);
          getContactoId(id);
        }
      }, [])


    async function getContactoId(id){
        const contactoEditable = await Axios.get(`http://127.0.0.1:3003/api/contact/${id}`, {
            headers: {"Authorization" : `${localStorage.getItem('token')}`}
        });
        setFormulario({
            email: contactoEditable.data.data.email,
            name: contactoEditable.data.data.name,
            phone: contactoEditable.data.data.phone,
            type: contactoEditable.data.data.type,
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (!editing){
            //CREANDO
            const contactoCreado = await Axios.post("http://127.0.0.1:3003/api/contact/"+localStorage.getItem('usuario'), formulario,{
                headers: {"Authorization" : `${localStorage.getItem('token')}`}
            });
            console.log(contactoCreado);
            if(contactoCreado.data.ok){
                window.location.href="/contactos"
            } else {
                alert(contactoCreado.data.message);
            }
        } else {
            //EDITANDO
            const contactoEditado = await Axios.put("http://127.0.0.1:3003/api/contact/"+id, formulario,{
                headers: {"Authorization" : `${localStorage.getItem('token')}`}
            });
            console.log(contactoEditado);
            if(contactoEditado.data.ok){
                window.location.href="/contactos"
            } else {
                alert(contactoEditado.data.message);
            }
        }
    }

    function onInputChange(e){
        setFormulario({...formulario, [e.target.name]: e.target.value})
    }


    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Agregar contacto</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" 
                            value={formulario.name} 
                            name="name" onChange={onInputChange} 
                            placeholder="Nombre"
                            required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" 
                            value={formulario.email} 
                            name="email" onChange={onInputChange} 
                            placeholder="E-mail"
                            required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" 
                            value={formulario.phone} 
                            name="phone" onChange={onInputChange} 
                            placeholder="Teléfono"
                            required/>
                        </div>
                        <div className="form-group">
                            <label>Tipo de contacto </label>
                            <select 
                            className="form-control"
                            name="type"
                            onChange={onInputChange}
                            value={formulario.type}
                            >
                            {
                                tipos.map( tipo => {
                                return (
                                    <option key={tipo._id} value={tipo._id}>
                                    {tipo.description}
                                    </option>
                                )
                                })
                            }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">{editing ? 'Editar Contacto' : 'Agregar Contacto'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormularioContacto;