const Pet = require('../app/models/pet');

exports.post = async(data) => {
    const pet = new Pet(data);
    await pet.save();
}

exports.getAll = async() => {
    const res = await Pet.find().lean();
    return res;
}

exports.getById = async(id) => {
    const res = await Pet.find({id: id}).lean();
    return res;
}

exports.getByOwnerId = async(id) => {
    const res = await Pet.find({ownerId: id});
    return res;
}

exports.put = async(id, data) => {
    let res = await Pet.findOneAndUpdate(
        {id: id}, 
        {
            $set: {
                name: data.name,
                ownerId: data.ownerId,
                age: data.age,
                updatedAt: new Date()
            }
        },
        { returnOriginal: false }
    ).lean();

    return res;
}

exports.delete = async(id) => {
    await Pet.findOneAndDelete({id: id});
}