import React, { Fragment, useEffect, useState, Link } from 'react';
import Navigation from '../components/Navigation';
import Axios from 'axios';

const Contacto = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        getContactos();
      }, [])

    async function getContactos(id){
        const res = await Axios.get("http://127.0.0.1:3003/api/contacts/"+localStorage.getItem('usuario'),{
            headers: {"Authorization" : `${localStorage.getItem('token')}`}
        });
        console.log(res);
        if(res.data.ok){
            setContactos(res.data.data);
        } else {
            alert(res.data.message);
        }
      }
    
    async function deleteContacto(id) {
        await Axios.delete("http://127.0.0.1:3003/api/contact/"+id,{
            headers: {"Authorization" : `${localStorage.getItem('token')}`}
        });
        getContactos();
    }

    return(
            <div className="row">
                {
                    contactos.map( contacto => {
                        return (
                            <div className="col-md-4 p-2">
                                <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{contacto.name}</h5>
                                    { contacto.type.description === "profesional" 
                                        ? <div className="divVerde"> {contacto.type.description} </div>
                                        : <div className="divAzul"> {contacto.type.description} </div>
                                    }
                                    {/* <Link className="btn btn-secondary" to={`/edit/${note._id}`}>
                                    Edit
                                    </Link> */}
                                </div>
                                <div className="card-body">
                                    <p>E-mail: {contacto.email}</p>
                                    <p>Teléfono: {contacto.phone}</p>
                                    {/* <i>- {note.author.userName}</i>
                                    <p>{format(note.date)}</p> */}
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-dark" onClick={() => {window.location.href = "/contactos/editar/"+contacto._id}} >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteContacto(contacto._id)} >
                                    Delete
                                    </button>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default Contacto;