
const { exploredData } = require('../models/exploredData.model.js')
const getData = async (req, res) => {
    try {
        const dataVals = await exploredData.find();
        res.json(dataVals);
    } catch (error) {
        console.log("errors", error)
        res.status(500).json({ error: 'Failed to fetch records' });
    }
};

const createData = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newData = new exploredData({ name, description });
        let respData = await newData.save();
        res.status(201).send(respData);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateData = async (req, res) => {
    try {
        const { _id, name, description } = req.body;
        console.log("requestBody",req.body)
        let respData = await exploredData.findByIdAndUpdate(_id, { description })
        if(respData){
            res.status(200).send('0k');
        }

    } catch (error) {
        console.log("requestBodyerror",error)
        res.status(400).send(error);
    }
};


module.exports = { getData, createData,updateData };
