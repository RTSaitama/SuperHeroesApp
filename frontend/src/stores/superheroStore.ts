import { create } from 'zustand';
import { Superhero, CreateSuperheroRequest } from '../types/superhero';
import { superheroAPI } from '../services/api';

interface SuperheroState {
  superheroes: Superhero[];
  currentSuperhero: Superhero | null;
  
  loading: boolean;
  error: string | null;
  
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  
  fetchSuperheroes: (page?: number) => Promise<void>;
  createSuperhero: (data: CreateSuperheroRequest) => Promise<void>;
  deleteSuperhero: (id: string) => Promise<void>;  
  updateSuperhero: (id: string, data: Partial<CreateSuperheroRequest>) => Promise<void>;  
  clearError: () => void;
  setCurrentSuperhero: (superhero: Superhero | null) => void;
  uploadImages: (id: string, files: File[]) => Promise<void>;  
  deleteImage: (id: string, imageName: string) => Promise<void>;
}

export const useSuperheroStore = create<SuperheroState>((set, get) => ({
  superheroes: [],
  currentSuperhero: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  },

  fetchSuperheroes: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await superheroAPI.getAll(page, 5);
      set({
        superheroes: response.data,
        pagination: response.pagination,
        loading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch superheroes',
        loading: false 
      });
    }
  },

  createSuperhero: async (superheroData: CreateSuperheroRequest) => {
    set({ loading: true, error: null });
    try {
      const newSuperhero = await superheroAPI.create(superheroData);
      
      const { superheroes } = get();
      set({
        superheroes: [...superheroes, newSuperhero],
        loading: false,
      });
      
      get().fetchSuperheroes(get().pagination.currentPage);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create superhero',
        loading: false 
      });
    }
  },

  deleteSuperhero: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await superheroAPI.delete(id);
      
      const { superheroes } = get();
      const updatedSuperheroes = superheroes.filter(hero => hero.id !== id);
      set({
        superheroes: updatedSuperheroes,
        loading: false,
      });
      
      get().fetchSuperheroes(get().pagination.currentPage);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete superhero',
        loading: false 
      });
    }
  },
 uploadImages: async (id: string, files: File[]) => {
    set({ loading: true, error: null });
    try {
      const response = await superheroAPI.uploadImages(id, files);
      
      const { superheroes } = get();
      const updatedSuperheroes = superheroes.map(hero => 
        hero.id === id ? response.superhero : hero
      );
      
      set({
        superheroes: updatedSuperheroes,
        loading: false,
      });
      
      get().fetchSuperheroes(get().pagination.currentPage);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to upload images',
        loading: false 
      });
    }
  },
  deleteImage: async (id: string, imageName: string) => {
    set({ loading: true, error: null });
    try {
      const response = await superheroAPI.deleteImage(id, imageName);
      
      const { superheroes } = get();
      const updatedSuperheroes = superheroes.map(hero => 
        hero.id === id ? response.superhero : hero
      );
      
      set({
        superheroes: updatedSuperheroes,
        loading: false,
      });
 
      get().fetchSuperheroes(get().pagination.currentPage);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete image',
        loading: false 
      });
    }
  },
  updateSuperhero: async (id: string, updateData: Partial<CreateSuperheroRequest>) => {
    set({ loading: true, error: null });
    try {
      const updatedSuperhero = await superheroAPI.update(id, updateData);
      
      const { superheroes } = get();
      const updatedSuperheroes = superheroes.map(hero => 
        hero.id === id ? updatedSuperhero : hero
      );
      
      set({
        superheroes: updatedSuperheroes,
        currentSuperhero: null, 
        loading: false,
      });
      
      get().fetchSuperheroes(get().pagination.currentPage);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update superhero',
        loading: false 
      });
    }
  },
  clearError: () => set({ error: null }),
  
  setCurrentSuperhero: (superhero: Superhero | null) => set({ currentSuperhero: superhero }),
}));
  