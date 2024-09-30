import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import languageRoutes from './routes/languageRoutes';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import roleRoutes from './routes/roleRoutes';
import permissionRoutes from './routes/permissionRoutes';
import apiEndpointRoutes from './routes/apiEndpointRoutes';
import siteRoutes from './routes/siteRouter';
import { authenticateJWT } from './middlewares/authenticateJWT';
import { authorize } from './middlewares/authorize';
import statusUser from './middlewares/statusUser';


const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Authentication API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/controllers/authController.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.static(path.join(__dirname, 'public/uploads')));

app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
app.use('/users', statusUser, authenticateJWT, authorize('admin'), userRoutes);
app.use('/languages', statusUser, authenticateJWT, authorize('admin'), languageRoutes);
app.use('/roles', statusUser, authenticateJWT, authorize('admin'), roleRoutes);
app.use('/permissions', statusUser, authenticateJWT, authorize('admin'), permissionRoutes);
app.use('/apiEndpoints', apiEndpointRoutes);
app.use('/sites', siteRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
