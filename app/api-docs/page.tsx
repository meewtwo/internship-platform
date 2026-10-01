import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { swaggerDocument } from '@/lib/swagger';

export default function ApiDocsPage() {
  return <SwaggerUI spec={swaggerDocument} />;
}