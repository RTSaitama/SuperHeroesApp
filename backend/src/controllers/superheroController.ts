import { Request, Response } from 'express';
import { readData, writeData } from '../utils/dataUtils';
import { Superhero, PaginationResponse, CreateSuperheroRequest } from '../types/superhero';
import { v4 as uuidv4 } from 'uuid';

export const getSuperheroes = (req: Request, res: Response): void => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    
    const data = readData();
    const { superheroes } = data;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSuperheroes = superheroes.slice(startIndex, endIndex);
    
    const response: PaginationResponse<Superhero> = {
      data: paginatedSuperheroes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(superheroes.length / limit),
        totalItems: superheroes.length,
        itemsPerPage: limit
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error in getSuperheroes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const createSuperhero = (req: Request, res: Response): void => {
  try {
    const superheroData: CreateSuperheroRequest = req.body;
    
    if (!superheroData.nickname || !superheroData.real_name) {
      res.status(400).json({ error: 'Nickname and real_name are required' });
      return;
    }
    
    const data = readData();
    
    const newSuperhero: Superhero = {
      id: uuidv4(),
      nickname: superheroData.nickname,
      real_name: superheroData.real_name,
      origin_description: superheroData.origin_description || '',
      superpowers: superheroData.superpowers || '',
      catch_phrase: superheroData.catch_phrase || '',
      images: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    data.superheroes.push(newSuperhero);
    data.nextId += 1;
    
    writeData(data);
    
    res.status(201).json(newSuperhero);
  } catch (error) {
    console.error('Error in createSuperhero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSuperhero = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ error: 'Superhero ID is required' });
      return;
    }
    
    const data = readData();
    
    const heroIndex = data.superheroes.findIndex(hero => hero.id === id);
    
    if (heroIndex === -1) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }
    
    const deletedHero = data.superheroes.splice(heroIndex, 1)[0];
    
    writeData(data);
    
    res.json({ 
      message: 'Superhero deleted successfully',
      deletedSuperhero: deletedHero 
    });
  } catch (error) {
    console.error('Error in deleteSuperhero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSuperhero = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      res.status(400).json({ error: 'Superhero ID is required' });
      return;
    }
    
    const data = readData();
    
    const heroIndex = data.superheroes.findIndex(hero => hero.id === id);
    
    if (heroIndex === -1) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }
    
    const existingHero = data.superheroes[heroIndex];
    const updatedHero: Superhero = {
      ...existingHero,
      ...updateData,
      id: existingHero.id, 
      created_at: existingHero.created_at,
      updated_at: new Date().toISOString() 
    };
    
    data.superheroes[heroIndex] = updatedHero;
    
    writeData(data);
    
    res.json(updatedHero);
  } catch (error) {
    console.error('Error in updateSuperhero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const uploadSuperheroImages = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    
    if (!id) {
      res.status(400).json({ error: 'Superhero ID is required' });
      return;
    }
    
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }
    
    const data = readData();
    
    const heroIndex = data.superheroes.findIndex(hero => hero.id === id);
    
    if (heroIndex === -1) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }
    
    const newImagePaths = files.map(file => file.filename);
    const existingHero = data.superheroes[heroIndex];
    
    const updatedHero: Superhero = {
      ...existingHero,
      images: [...existingHero.images, ...newImagePaths],
      updated_at: new Date().toISOString()
    };
    
    data.superheroes[heroIndex] = updatedHero;
    
    writeData(data);
    
    res.json({
      message: 'Images uploaded successfully',
      uploadedImages: newImagePaths,
      superhero: updatedHero
    });
  } catch (error) {
    console.error('Error in uploadSuperheroImages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};