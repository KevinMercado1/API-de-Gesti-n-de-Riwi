import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Riwi Management API',
      version: '1.0.0',
      description: 'API hecha con Swagger',
    },
    components: {
      schemas: {
        TL: {
          type: 'object',
          required: ['name', 'description, position'],
          properties: {
            id: {
              type: 'string',
              example: 'fvbSVKSLVJNLdvk',
            },
            name: {
              type: 'string',
              example: 'nueva tarea',
            },
            description: {
              type: 'string',
              example: 'Este es un breve ejemplo de una descripcion',
            },
            position: {
              type: 'string',
              example: 'Backend Senior Developer',
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
