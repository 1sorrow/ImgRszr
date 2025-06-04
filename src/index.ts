import express from 'express';
import path from 'path';
import uploadRoutes from './routes/uploadRoutes';
import resizeRoutes from './routes/resizeRoutes';
import imageRoutes from './routes/imageRoutes';

const app = express();

app.use(express.json()); // Required to parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, '..', 'images')));


app.use('/api/upload', uploadRoutes);     // POST /api/upload
app.use('/api/resize', resizeRoutes);     // POST /api/resize
app.use('/api/images', imageRoutes);      // GET /api/images

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app; 