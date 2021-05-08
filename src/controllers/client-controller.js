const client = require('../app/models/client');
const repository = require('../repositories/client-repository');
const pet = require('../repositories/pet-repository');

exports.post = async (req, res) => {
    try {
        var currentdate = new Date(); 
        
        let newClient = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            createdAt: currentdate,
            updatedAt: currentdate,
        }

        let arrayData = {
            data: newClient,
            href: req.protocol + '://' + req.get('host') + req.originalUrl + "/" + req.body.id
        };

        await repository.post(newClient); 

        res.status(201).send({
            message: 'Client added successfully',
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
        let data = await repository.getAll();
        let quantity = data.length;

        let arrayData = [];

        for await (let client of data) {
            let clientVar = client;
            let pets = await pet.getByOwnerId(client.id);
            let petList = [];

            for await(let pet of pets) {
                petList.push(req.protocol + '://' + req.get('host') + '/api/pet/' + pet.id);
            }

            clientVar.href = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + client.id
            clientVar.pets = petList;

            arrayData.push(clientVar);
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
        const id = req.params.clientId;
        const data = await repository.getById(id);

        let client = data;
        
        let pets = await pet.getByOwnerId(data[0].id);
        let petList = [];

        for await(let pet of pets) {
            petList.push(req.protocol + '://' + req.get('host') + '/api/pet/' + pet.id);
        }

        client[0].pets = petList;

        let arrayData = {
            data: client,
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        };

        if (data) {
            res.status(200).send({
                data: arrayData
            });
        } else {
            res.status(404).send({message: 'Client not found'});
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
        const id = req.params.clientId;
        const data = await repository.put(id, req.body);

        let arrayData = {
            data: data,
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        };

        res.status(200).send({
            message: 'Client updated successfully',
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
        await repository.delete(req.params.clientId);
        res.status(200).send({
            message: 'Client deleted successfully'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed processing request',
            erro: error.toString()
        });
    }
};