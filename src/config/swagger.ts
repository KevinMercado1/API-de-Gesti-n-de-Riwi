import { describe } from 'node:test';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Riwi Management API',
      version: '1.0.0',
      description: 'API built with Swagger',
    },
    components: {
      schemas: {
        TL: {
          type: 'object',
          required: ['name', 'description', 'position'],
          properties: {
            id: {
              type: 'string',
              example: 'fvbSVKSLVJNLdvk',
            },
            name: {
              type: 'string',
              example: 'new task',
            },
            description: {
              type: 'string',
              example: 'This is a brief example of a description',
            },
            position: {
              type: 'string',
              example: 'Backend Senior Developer',
            },
          },
        },
        Coder: {
          type: 'object',
          required: ['name', 'email', 'status'],
          properties: {
            id: {
              type: 'string',
              example: 'fvbSVKSLVJNLdvk',
            },
            name: {
              type: 'string',
              example: 'new coder',
            },
            email: {
              type: 'string',
              example: 'coder@example.com',
            },
            status: {
              type: 'string',
              example: 'Active',
            },
          },
        },
        Clan: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'Clan of Developers',
            },
            description: {
              type: 'string',
              example: 'A clan for developers',
            },
          },
        },
        Route: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'Route of Developers',
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
