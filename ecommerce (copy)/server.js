import express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"

import cors from "cors";

/* config dotenv */
dotenv.config();

/* database config */
mongoDB(); 

/* rest object */
const app = express();
 
/* middeleware */
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes);
app.use( '/api/v1/category', categoryRoutes )
app.use( '/api/v1/products', productRoutes )

/* rest api */
app.get('/', ( req, res )=>{
    res.send('<h1>Welcome to E Commerce Website</h1>')
});

/* Port */
const Port = process.env.Port || 8080 ;

/* run app */
app.listen(Port, ()=>{
    console.log(`Server Runnig on ${Port}`);
})