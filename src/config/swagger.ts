import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Riwi Management API',
      version: '1.0.0',
      description:
        'API built with Swagger for managing TLs, Coders, Clans, and Routes',
    },
    components: {
      schemas: {
        TL: {
          type: 'object',
          required: ['name', 'shift', 'position'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            shift: {
              type: 'string',
              enum: ['morning', 'night'],
              example: 'morning',
            },
            position: {
              type: 'string',
              example: 'Backend Senior Developer',
            },
          },
        },
        Coder: {
          type: 'object',
          required: ['name', 'email', 'status', 'shift', 'clanId'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'Coder Name',
            },
            email: {
              type: 'string',
              example: 'coder@example.com',
            },
            status: {
              type: 'string',
              example: 'Active',
            },
            shift: {
              type: 'string',
              enum: ['morning', 'night'],
              example: 'morning',
            },
            clanId: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
          },
        },
        Clan: {
          type: 'object',
          required: ['name', 'shift', 'routeId'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'Clan Gates',
            },
            shift: {
              type: 'string',
              enum: ['morning', 'night'],
              example: 'morning',
            },
            routeId: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
          },
        },
        Route: {
          type: 'object',
          required: ['name', 'description', 'shift', 'tlId'],
          properties: {
            id: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
            },
            name: {
              type: 'string',
              example: 'Backend Route',
            },
            description: {
              type: 'string',
              example: 'Learn Node.js and Databases',
            },
            shift: {
              type: 'string',
              enum: ['morning', 'night'],
              example: 'morning',
            },
            tlId: {
              type: 'string',
              example: '60d5ec49f1b2c4a4e4e9f123',
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
