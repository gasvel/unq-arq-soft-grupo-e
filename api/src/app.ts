import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config';
import productsRoutes from './routes/Products/ProductsRoutes'
import userRoutes from './routes/Users/UsersRoutes'
import salesRotes from './routes/Sales/SalesRoutes'

const app = express()

app.set('port', config.PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))

app.use(productsRoutes);
app.use(userRoutes);
app.use(salesRotes);

export default app;