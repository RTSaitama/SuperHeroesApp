import { Router } from 'express';
import { getSuperheroes, createSuperhero, deleteSuperhero, updateSuperhero, uploadSuperheroImages, deleteSuperheroImage } from '../controllers/superheroController';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getSuperheroes);

router.post('/', createSuperhero);

router.put('/:id', updateSuperhero);

router.post('/:id/images', upload.array('images', 5), uploadSuperheroImages);

router.delete('/:id/images/:imageName', deleteSuperheroImage);

router.delete('/:id', deleteSuperhero);



export default router;