import { Router } from 'express';
import { getSuperheroes, createSuperhero, deleteSuperhero, updateSuperhero, uploadSuperheroImages } from '../controllers/superheroController';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getSuperheroes);

router.post('/', createSuperhero);

router.put('/:id', updateSuperhero);

router.post('/:id/images', upload.array('images', 5), uploadSuperheroImages);

router.delete('/:id', deleteSuperhero);

export default router;