import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserRoutes } from './routes/users.routes';
import * as dotenv from 'dotenv';
import { FactoryDatabase } from './db/interfaces/db.factory';
import { CategoryRoutes } from './routes/category.routes';
import { ProductRoutes } from './routes/product.routes';

dotenv.config();
const app = express();
const port = 5000;
const factoryDatabase = new FactoryDatabase();
const dbReference = process.env.DB;
const dbConnection = factoryDatabase.getDatabaseInstance(dbReference);
// Midelwares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
const userRoutes = new UserRoutes(express.Router());
const categoryRoutes = new CategoryRoutes(express.Router());
const productRoutes = new ProductRoutes(express.Router());


// Routes
app.get('/', (req, res) => res.send('Server alive'));
app.use('/api/users', userRoutes.getRoute);
app.use('/api/categories', categoryRoutes.getRoute);
app.use('/api/products', productRoutes.getRoute);

dbConnection.connectToDataBase()
    .then(_ => {
        console.log(`[db-${dbReference}]: Database correctly connected`);
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    })
    .catch((error: any) => {
        throw new Error(error);
    });


