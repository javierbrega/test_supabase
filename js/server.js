const express = require('express'); // Importa el módulo 'express' para crear el servidor web
const cors = require('cors'); // Importa el módulo 'cors' para manejar las solicitudes de diferentes orígenes
const { createClient } = require('@supabase/supabase-js'); // Importa la función 'createClient' del módulo '@supabase/supabase-js' para interactuar con Supabase
const app = express(); // Crea una instancia de la aplicación express
const port = 3000; // Define el puerto en el que se ejecutará el servidor

app.use(cors()); // Usa el middleware 'cors' para permitir solicitudes de diferentes orígenes
app.use(express.json()); // Usa el middleware de express para manejar el cuerpo de la solicitud en formato JSON
app.use(express.urlencoded({ extended: true })); // Usa el middleware de express para manejar el cuerpo de la solicitud en formato urlencoded

const supabaseUrl = 'https://tixhydnqvkobvghzfdwv.supabase.co'; // URL de la base de datos de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'; // Clave de acceso a la base de datos de Supabase
const supabase = createClient(supabaseUrl, supabaseKey); // Crea un cliente Supabase con la URL y la clave proporcionadas

app.get('/supabase', (req, res) => { // Define un endpoint para devolver la URL y la clave de Supabase
    res.json({
        supabaseUrl: supabaseUrl,
        supabaseKey: supabaseKey,
    });
});

app.get('/productos', async (req, res) => { // Define un endpoint para obtener todos los productos
    const { data, error } = await supabase // Realiza una consulta a Supabase para obtener todos los productos
        .from('productos')
        .select('*');
    if (error) return res.status(500).send(error.message); // Maneja errores de la consulta
    res.status(200).send(data); // Devuelve los datos de los productos
});

app.get('/productos/:id', async (req, res) => { // Define un endpoint para obtener un producto por su ID
    const productId = req.params.id; // Obtiene el ID del producto de los parámetros de la solicitud
    const { data, error } = await supabase // Realiza una consulta a Supabase para obtener el producto con el ID proporcionado
        .from('productos')
        .select('*')
        .eq('id', productId)
        .single();

    if (error) return res.status(500).send(error.message); // Maneja errores de la consulta
    if (!data) return res.status(404).send('Producto no encontrado'); // Si no se encuentra el producto, devuelve un mensaje de error
    res.status(200).send(data); // Devuelve los datos del producto
});

app.listen(port, () => { // Inicia el servidor y escucha en el puerto especificado
    console.log(`Servidor corriendo en http://localhost:${port}`); // Imprime un mensaje en la consola indicando la URL del servidor
});
