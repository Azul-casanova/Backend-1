import express from 'express';
import cartsRouter from "./routes/carts.router";
import productsRouter from "./routes/products.router";
const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);




app.get('/', (req, res)=>{
    res.send("HOLA ESTE ES EL LOGIN");
})










app.listen(PUERTO, ()=>{})