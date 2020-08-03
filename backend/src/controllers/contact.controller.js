import Contact from '../models/contact.model';

let contactController = {};

contactController.createContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, type } = req.body;
    try {
        const contactCreado = new Contact({
            name,
            email,
            phone,
            type,
            user: id
        });
        await contactCreado.save();
        return res.status(200).json({
            ok: true,
            message: `Contacto agregado`,
            data: contactCreado
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al crear el contacto`
        })
    }
}

contactController.getContacts = async (req, res) => {
    const { id } = req.params;
    try {
        const contacts = await Contact.find({ user: id }).populate("type");
        if (contacts.length <= 0) {
            return res.status(200).json({
                ok: false,
                message: `Lista de contactos vacía`
            })
        }
        return res.status(200).json({
            ok: true,
            message: `Lista de contactos obtenida.`,
            data: contacts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error al listar los contactos`
        })
    }
}

contactController.getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id);
        if(!contact) {
            return res.status(200).json({
                ok: false,
                message: `NO existen un contacto con id ${id} registrados en la BD`,
                data: contact
            })
        }
        return res.status(200).json({
            ok: true,
            message: `Usuario con id: ${id} encontrado.`,
            data: contact
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error en el servidor al buscar el contacto con id: ${id}`
        })
    }
}

contactController.updateContactById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, type } = req.body;
    try {
        const contacto = await Contact.findOneAndUpdate({_id: id}, {
            name,
            email,
            phone,
            type
        });
        return res.status(200).json({
            ok: true,
            message: `Contacto modificado`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error al modificar el contacto con id: ${id}.`,
        })
    }
}

contactController.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contactoEliminado = await Contact.findByIdAndDelete({_id: id});
        return res.status(200).json({
            ok: true,
            message: `El contacto con id ${id} ha sido eliminado.`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: `Error en el servidor al eliminar el contacto con id: ${id}`
        })
    }
}

export default contactController;