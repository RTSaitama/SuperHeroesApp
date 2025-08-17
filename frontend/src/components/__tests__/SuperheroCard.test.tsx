import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SuperheroCard } from '../superheroCard';
import { Superhero } from '../../types/superhero';

const mockSuperhero: Superhero = {
  id: '1',
  nickname: 'Test Hero',
  real_name: 'Test Name',
  origin_description: 'Test origin story',
  superpowers: 'Test powers',
  catch_phrase: 'Test phrase',
  images: [],
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
};

describe('SuperheroCard', () => {
  it('renders superhero information correctly', () => {
    render(<SuperheroCard superhero={mockSuperhero} />);
    
    expect(screen.getByText('Test Hero')).toBeInTheDocument();
    expect(screen.getByText(/Powers:/)).toBeInTheDocument();
    expect(screen.getByText(/Catchphrase:/)).toBeInTheDocument();
    expect(screen.getByText(/Origin:/)).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(
      <SuperheroCard 
        superhero={mockSuperhero} 
        onEdit={mockOnEdit}
      />
    );
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockSuperhero);
  });

  it('calls onDelete when Delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(
      <SuperheroCard 
        superhero={mockSuperhero} 
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('does not render Edit/Delete buttons when callbacks are not provided', () => {
    render(<SuperheroCard superhero={mockSuperhero} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});