 import React from 'react';
import { Superhero } from '../types/superhero';
import { SuperheroCard } from './superheroCard';

interface SuperheroListProps {
  superheroes: Superhero[];
  loading: boolean;
  onEdit?: (superhero: Superhero) => void;
  onDelete?: (id: string) => void;
  onUploadImages?: (id: string, files: File[]) => void;
  onDeleteImage?: (id: string, imageName: string) => void;  
}

export const SuperheroList: React.FC<SuperheroListProps> = ({ 
  superheroes, 
  loading, 
  onEdit, 
  onDelete,
  onUploadImages,
  onDeleteImage  
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '18px', color: '#666' }}>Loading superheroes...</div>
      </div>
    );
  }

  if (superheroes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '18px', color: '#666' }}>No superheroes found</div>
        <div style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
          Create your first superhero!
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333', backgroundColor:'white', borderRadius: '5px', padding: '10px' }}>
        Superheroes ({superheroes.length})
      </h2>
      
      <div>
        {superheroes.map((superhero) => (
          <SuperheroCard
            key={superhero.id}
            superhero={superhero}
            onEdit={onEdit}
            onDelete={onDelete}
            onUploadImages={onUploadImages}
            onDeleteImage={onDeleteImage}  
          />
        ))}
      </div>
    </div>
  );
};