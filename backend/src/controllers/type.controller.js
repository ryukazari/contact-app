import Type from '../models/type.model';

let typeController = {};

typeController.createType = async (req, res) => {
    const { description } = req.params.body;
    const typeCreated = new Type({
        description
    });
    await typeCreated.save();
    return res.status(200).json({
        ok: true
    })
}

typeController.getTypes = async (req, res) => {
    const tipos = await Type.find();
    return res.status(200).json({
        ok: true,
        data: tipos
    })
}

export default typeController;