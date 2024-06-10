import fs from 'fs.promises';

class ProductManager {
    static ultId = 0; 


    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, img, code, stock) {
 
        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios"); 
            return;
        }

        if(this.products.some(item => item.code === code)) {
            console.log("El code debe ser unico");
            return; 
        }


        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description, 
            price,
            img,
            code,
            stock
        };

        this.products.push(nuevoProducto);
        
        await this.guardarArchivo(this.products);

    }

    async getProducts() {
        let arrayProductos = await this.leerArchivo(); 
        return arrayProductos; 
    }

    getProductById(id) {
        const producto = this.products.find(item => item.id === id);

        if (!producto) {
            console.error("Not Found");
        } else {
            console.log("El producto buscado:", producto);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo: ", error);
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const array = JSON.parse(respuesta);
            return array; 

        } catch (error) {
            console.log("Error al leer el archivo: ", error);
        }
    }
}



const manager = new ProductManager("./productos.json"); 
manager.addProduct('azul')


const agregarProducto = async () => {
    await manager.addProduct("Francia", "este es un nuevo producto test", 200, "Sin imagen", "abc124", 25);
}



agregarProducto(); 

const retornarProductos = async () => {
    let respuesta = await manager.getProducts();
    console.log(respuesta);
}

retornarProductos(); 
