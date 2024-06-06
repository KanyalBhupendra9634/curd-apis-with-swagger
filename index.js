// app.js
const express = require('express');
const {mongoose} =require('mongoose')
require('dotenv').config();
const exploredRouter = require('./router/userData.router.js')
const app = express();


const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    exploredRouter(req,res,next)
})

// Connect to MongoDB then start the port
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected!');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

