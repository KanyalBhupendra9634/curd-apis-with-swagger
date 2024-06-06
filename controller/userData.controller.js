
const { userData } = require('../models/userData.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const invalidatedTokens = require('../models/invalidatedTokens.model.js')
const secretKey = process.env.SECRET_KEY;

const getUserData = async (req, res) => {
    try {
        const user = req.user
        let dataVals = await userData.findOne({_id:user.id});
        if(!dataVals) throw new Error('data not found')
        dataVals = dataVals.toObject()
        delete dataVals.password
        res.status(200).json({success:'User data retrieved successfully',data:dataVals});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { fullName, username,password,about } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newData = new userData({ fullName, username, password:hashedPassword,about });
        let respData = await newData.save();
        respData = respData.toObject()
        delete respData.password
        res.status(201).json({success:'user created successfully',data:respData});
    } catch (error) {
        res.status(400).json({error,message:error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        let respData = await userData.findOne({username:userName})

        const isPasswordMatching = await bcrypt.compare(password, respData.password)
        
        if(respData && isPasswordMatching){
            respData = respData.toObject()
            delete respData.password

            const token = jwt.sign({ id: respData._id, username: respData.username }, secretKey, { expiresIn: '1h' });

            res.status(200).json({success:'user logged in successfully',authToken:token});
        }
        else if(!respData || !isPasswordMatching){
           throw new Error('Invalid user name or password')
        }
    } catch (error) {
        res.status(400).json({error,msg:error.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        const invalidToken = new invalidatedTokens({ token: req.headers.authorization });
        await invalidToken.save();
        res.status(200).json({ success: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUserData, registerUser,loginUser,logoutUser };
