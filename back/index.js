    const express = require('express');
    const cors = require('cors')
    const path = require('path');
    //const dotenv = require('dotenv');
    const helmet = require('helmet');
    const compression = require('compression');

    const app = express();
    const router = require('./routes').init()

    // Serve static React build
    app.use(express.static(path.join(__dirname, '../front/build')));

    // Middleware to parse JSON request bodies
    app.use(express.json());
    app.use(helmet());       
    app.use(compression());
    app.use(cors());

    app.use('/api', router);


    app.get('/api/health', (req, res) => {
        res.json({
            status: 'ok',
            env: process.env.NODE_ENV || 'development',
            time: new Date().toISOString(),
        });
    });

    // Fallback to React for unknown routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../front/build', 'index.html'));
    });;


    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
