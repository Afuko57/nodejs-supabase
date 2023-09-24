const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');
const port = 9000;

const supabaseUrl = '--'
const supabaseKey = '--'
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/products', async (req, res) => {
  try {
    const payload = req.body;
    const { data, error } = await supabase
      .from('products')
      .upsert(payload); 

    if (error) {
      console.error('Error inserting product:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});