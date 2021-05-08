const Client = require('../app/models/client');

exports.post = async(data) => {
    const client = new Client(data);
    await client.save();
}

exports.getAll = async() => {
    const res = await Client.find().lean();
    return res;
}

exports.getById = async(id) => {
    const res = await Client.find({id: id}).lean();
    return res;
}

exports.put = async(id, data) => {
    let res = await Client.findOneAndUpdate(
        {id: id}, 
        {   
            $set: {
                name: data.name,
                email: data.email,
                age: data.age,
                updatedAt: new Date()
            }
        },
        { returnOriginal: false }
    ).lean();

    return res;
}

exports.delete = async(id) => {
    await Client.findOneAndDelete({id: id});
}