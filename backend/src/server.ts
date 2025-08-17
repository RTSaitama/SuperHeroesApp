import express from 'express';
import cors from 'cors';
import path from 'path';
import superheroRoutes from './routes/superheroes';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.get('/api/test', (req, res) => {
  res.json({ message: 'back works' });
});


app.use('/api/superheroes', superheroRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, '../uploads')}`);
});

export default app;