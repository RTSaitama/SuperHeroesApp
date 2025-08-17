import { Superhero, CreateSuperheroRequest, PaginationResponse } from '../types/superhero';

const API_BASE_URL = 'http://localhost:3001/api';

export const superheroAPI = {
  async getAll(page: number = 1, limit: number = 5): Promise<PaginationResponse<Superhero>> {
    const response = await fetch(`${API_BASE_URL}/superheroes?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch superheroes');
    }
    return response.json();
  },

  async create(superheroData: CreateSuperheroRequest): Promise<Superhero> {
    const response = await fetch(`${API_BASE_URL}/superheroes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(superheroData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create superhero');
    }
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete superhero');
    }
  },

  async update(id: string, updateData: Partial<CreateSuperheroRequest>): Promise<Superhero> {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update superhero');
    }
    return response.json();
  },

  async uploadImages(id: string, files: File[]): Promise<{ uploadedImages: string[], superhero: Superhero }> {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}/images`, {
      method: 'POST',
      body: formData, 
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload images');
    }
    return response.json();
  },
  async deleteImage(id: string, imageName: string): Promise<{ deletedImage: string, superhero: Superhero }> {
    const response = await fetch(`${API_BASE_URL}/superheroes/${id}/images/${imageName}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
    return response.json();
  }
};
