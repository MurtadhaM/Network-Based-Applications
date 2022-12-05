const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Find a Snake API',
        description: 'This is the API for the Find a Snake app',
        version: '1.0.0',
        contact: {
            email: 'hydra@findasnake.com'
        }
        ,
        servers: [
            {
                url: 'http://findasnake.com/api',
            }
        ]

    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: [],

    }]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
};

/**
 *  Import the routes
 */
const auth = require('./routes/Auth');
app.use( express.json() );

app.use('/API', auth);

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
