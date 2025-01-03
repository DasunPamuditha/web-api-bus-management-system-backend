const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bus Management System API - Backend',
      version: '1.0.0',
      description: 'Bus Management System - API documentation',
    },
    servers: [
        {
          url: 'http://localhost:5000',
          description: 'Local Development Server',
        },
        {
          url: 'https://web-api-bus-management-system-ba-production.up.railway.app',
          description: 'Deployed Server',
        },
      ],
      
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

console.log(swaggerDocs); // Debug log to check the generated spec
module.exports = swaggerDocs;