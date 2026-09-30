import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { router as authRouter } from './routes/auth.routes.ts';

const app = express();
app.use(express.json());

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internship Platform API',
      version: '1.0.0',
      description: 'Smart Internship & Career Matching Platform API',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: ['backend/src/routes/auth.routes.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});