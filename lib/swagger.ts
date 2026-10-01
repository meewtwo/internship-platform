export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Internship Platform API',
    version: '1.0.0',
    description: 'Smart Internship & Career Matching Platform API',
  },
  servers: [{ url: 'http://localhost:3001' }],
  paths: {
    '/api/auth/signup': {
      post: {
        tags: ['auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'first_name', 'last_name', 'role'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                    minLength: 8,
                  },
                  first_name: {
                    type: 'string',
                  },
                  last_name: {
                    type: 'string',
                  },
                  role: {
                    type: 'string',
                    enum: ['student', 'employer'],
                  },
                  university_id: {
                    type: ['string', 'null'],
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Registration successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation or constraint failure',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/verify': {
      post: {
        tags: ['auth'],
        summary: 'Verify OTP code',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  code: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 6,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OTP verified successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid or expired code',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/users/profile': {
      get: {
        tags: ['users'],
        summary: 'Get current user profile',
        responses: {
          '200': {
            description: 'User profile data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    role: { type: 'string' },
                    university_id: { type: ['string', 'null'] },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthenticated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['auth'],
        summary: 'User login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                    minLength: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    token: { type: 'string' },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};