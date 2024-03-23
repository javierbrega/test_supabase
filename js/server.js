const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar form-data

const supabaseUrl = 'https://tixhydnqvkobvghzfdwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGh5ZG5xdmtvYnZnaHpmZHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NjkzMDMsImV4cCI6MjAyNjM0NTMwM30.xsq46fcTH9DWeUWjyTKrI0NR004gI7bULzfs9R-UoRQ';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/supabase', (req, res) => {
    res.json({
        supabaseUrl: supabaseUrl,
        supabaseKey: supabaseKey,
    });
});
// Endpoint para obtener todos los productos
app.get('/productos', async (req, res) => {
    const { data, error } = await supabase
        .from('productos')
        .select('*');
    if (error) return res.status(500).send(error.message);
    res.status(200).send(data);
});

// Endpoint para obtener un producto por ID
app.get('/productos/:id', async (req, res) => {
    const productId = req.params.id;
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', productId)
        .single();

    if (error) return res.status(500).send(error.message);
    if (!data) return res.status(404).send('Producto no encontrado');
    res.status(200).send(data);
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
