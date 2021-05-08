const repository = require('../repositories/pet-repository');
const client = require('../repositories/client-repository');

exports.post = async (req, res) => {
    try {
        var currentdate = new Date(); 
        
        let newPet = {
            id: req.body.id,
            name: req.body.name,
            ownerId: req.body.ownerId,
            age: req.body.age,
            createdAt: currentdate,
            updatedAt: currentdate,
        }

        let arrayData = {
            data: newPet,
            href: req.protocol + '://' + req.get('host') + req.originalUrl + "/" + req.body.id
        };

        await repository.post(newPet); 

        res.status(201).send({
            message: 'Pet added successfully',
            data: arrayData
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.getAll = async(req, res) => {
    try {
        const data = await repository.getAll();
        const quantity = data.length;

        let arrayData = [];

        for await (let pet of data) {
            let petVar = pet;

            petVar.href = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + pet.id
            petVar.owner = req.protocol + '://' + req.get('host') + "/api/client/" + pet.ownerId;

            arrayData.push(petVar);
        }

        res.status(201).send({
            total: quantity, 
            data: arrayData,
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        });

    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.getById = async(req, res) => {
    try {
        const id = req.params.petId;
        let pet = await repository.getById(id);

        pet[0].owner = req.protocol + '://' + req.get('host') + "/api/client/" + pet[0].ownerId;

        let arrayData = {
            total: pet.length,
            data: pet,
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        };

        if (pet) {
            res.status(200).send({
                data: arrayData
            });
        } else {
            res.status(404).send({message: 'Pet not found'});
        }
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.put = async(req, res) => {
    try {
        const id = req.params.petId;
        let data = await repository.put(id, req.body);

        data.owner = req.protocol + '://' + req.get('host') + "/api/client/" + data.ownerId;

        let arrayData = {
            data: data,
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        };

        res.status(200).send({
            message: 'Pet updated successfully',
            data: arrayData
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }

};

exports.delete = async(req, res) => {
    try {
        await repository.delete(req.params.petId);
        res.status(200).send({
            message: 'Pet deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }
};