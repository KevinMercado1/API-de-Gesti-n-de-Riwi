imporyt swaggerJsdoc from 'swagger-jsdoc';

const options: swwaggerJs.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Riwi API',
      version: '1.0.0',
      description: 'API for Riwi management',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
