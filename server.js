const express = require('express');
const cors = require('cors'); // Importa el middleware CORS
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());

const supabaseUrl = 'https://tixhydnqvkobvghzfdwv.supabase.co'; // Asegúrate de reemplazar con tu URL real
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeGh5ZG5xdmtvYnZnaHpmZHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NjkzMDMsImV4cCI6MjAyNjM0NTMwM30.xsq46fcTH9DWeUWjyTKrI0NR004gI7bULzfs9R-UoRQ'; // Asegúrate de reemplazar con tu clave real
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi ecommerce!');
});

app.get('/productos', async (req, res) => {
    const { data, error } = await supabase
        .from('productos')
        .select('*');
    if (error) return res.status(500).send(error.message);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
