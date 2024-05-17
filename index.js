// app.js
const express = require('express');
const {mongoose} =require('mongoose')
const exploredRouter = require('./router/elxploredData.router.js')
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://kanyalgboby:x2eRclBoq6JJ9Vri@cluster0.wwhg0qt.mongodb.net/taskDb?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });



app.use((req, res, next) => {
    exploredRouter(req,res,next)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
