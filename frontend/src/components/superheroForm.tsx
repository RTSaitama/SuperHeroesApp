import React, { useState, useEffect } from 'react';
import { CreateSuperheroRequest, Superhero } from '../types/superhero';

interface SuperheroFormProps {
  onSubmit: (data: CreateSuperheroRequest) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  editingSuperhero?: Superhero | null; 
}

export const SuperheroForm: React.FC<SuperheroFormProps> = ({ 
  onSubmit, 
  onCancel, 
  loading = false,
  editingSuperhero = null 
}) => {
  const [formData, setFormData] = useState<CreateSuperheroRequest>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: ''
  });

  useEffect(() => {
    if (editingSuperhero) {
      setFormData({
        nickname: editingSuperhero.nickname,
        real_name: editingSuperhero.real_name,
        origin_description: editingSuperhero.origin_description,
        superpowers: editingSuperhero.superpowers,
        catch_phrase: editingSuperhero.catch_phrase
      });
    } else {
      setFormData({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: ''
      });
    }
  }, [editingSuperhero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nickname.trim() || !formData.real_name.trim()) {
      alert('Nickname and Real Name are required!');
      return;
    }

    try {
      await onSubmit(formData);
      
      if (!editingSuperhero) {
        setFormData({
          nickname: '',
          real_name: '',
          origin_description: '',
          superpowers: '',
          catch_phrase: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold' as const,
    color: '#333'
  };

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '20px', 
      borderRadius: '8px',
      marginBottom: '30px'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
        {editingSuperhero ? 'Edit Superhero' : 'Create New Superhero'} 
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Nickname *</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="e.g., Spider-Man"
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Real Name *</label>
          <input
            type="text"
            name="real_name"
            value={formData.real_name}
            onChange={handleChange}
            placeholder="e.g., Peter Parker"
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Origin Description</label>
          <textarea
            name="origin_description"
            value={formData.origin_description}
            onChange={handleChange}
            placeholder="Tell us about the hero's origin story..."
            style={{ ...inputStyle, height: '80px', resize: 'vertical' as const }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Superpowers</label>
          <textarea
            name="superpowers"
            value={formData.superpowers}
            onChange={handleChange}
            placeholder="List the hero's superpowers..."
            style={{ ...inputStyle, height: '60px', resize: 'vertical' as const }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Catchphrase</label>
          <input
            type="text"
            name="catch_phrase"
            value={formData.catch_phrase}
            onChange={handleChange}
            placeholder="e.g., With great power comes great responsibility!"
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'Saving...' : (editingSuperhero ? 'Update Superhero' : 'Create Superhero')}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};