import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoApp',
      version: '1.0.0',
      description:
        'API desarrollada con Express y TypeScript en el clan Centurion',
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          required: ['name', 'status'],
          properties: {
            id: {
              type: 'string',
              example: 'fvbSVKSLVJNLdvk',
            },
            name: {
              type: 'string',
              example: 'nueva tarea',
            },
            status: {
              type: 'string',
              example: 'pending|completed',
            },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },

  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
