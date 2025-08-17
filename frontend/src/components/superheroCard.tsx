 import React, { useState } from 'react';
import { Superhero } from '../types/superhero';

interface SuperheroCardProps {
  superhero: Superhero;
  onEdit?: (superhero: Superhero) => void;
  onDelete?: (id: string) => void;
  onUploadImages?: (id: string, files: File[]) => void;
  onDeleteImage?: (id: string, imageName: string) => void; 
}

export const SuperheroCard: React.FC<SuperheroCardProps> = ({ 
  superhero, 
  onEdit, 
  onDelete,
  onUploadImages,
  onDeleteImage 
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0 && onUploadImages) {
      onUploadImages(superhero.id, selectedFiles);
      setSelectedFiles([]);
    }
  };

  const handleDeleteImage = (imageName: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDeleteImage?.(superhero.id, imageName);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.8), rgba(25, 25, 112, 0.7), rgba(139, 0, 0, 0.6))',
      border: '3px solid #FFD700', 
      margin: '15px 0', 
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '30px',
        height: '30px',
        background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
        borderRadius: '50%',
        zIndex: 1
      }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            color: '#FFD700',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
            background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 0px #000)'
          }}>
            🦸‍♂️ {superhero.nickname} 
            <span style={{ 
              fontSize: '1.2rem',
              fontWeight: 'normal', 
              color: '#87CEEB',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              ({superhero.real_name})
            </span>
          </h3>
          
          <p style={{ 
            margin: '8px 0',
            color: '#FFF',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '8px',
            borderRadius: '8px',
            borderLeft: '4px solid #FF6B35'
          }}>
            <strong style={{ color: '#FFD700' }}>⚡ Powers:</strong> {superhero.superpowers}
          </p>
          
          <p style={{ 
            margin: '8px 0',
            color: '#FFF',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '8px',
            borderRadius: '8px',
            borderLeft: '4px solid #DC143C'
          }}>
            <strong style={{ color: '#FFD700' }}>💬 Catchphrase:</strong> "{superhero.catch_phrase}"
          </p>
          
          <p style={{ 
            margin: '8px 0', 
            fontSize: '14px', 
            color: '#E6E6FA',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '8px',
            borderRadius: '8px',
            borderLeft: '4px solid #4169E1'
          }}>
            <strong style={{ color: '#FFD700' }}>📖 Origin:</strong> {superhero.origin_description}
          </p>

          {superhero.images && superhero.images.length > 0 && (
            <div style={{ 
              margin: '15px 0',
              padding: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '10px',
              border: '2px solid rgba(255, 215, 0, 0.3)'
            }}>
              <strong style={{ 
                color: '#FFD700',
                fontSize: '1.1rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>🖼️ Hero Gallery:</strong>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
                {superhero.images.map((image, index) => (
                  <div key={index} style={{ 
                    position: 'relative', 
                    display: 'inline-block',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '3px solid #FFD700',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                  }}>
                    <img
                      src={`http://localhost:3001/uploads/${image}`}
                      alt={`${superhero.nickname} ${index + 1}`}
                      style={{
                        width: '200px',
                        height: '150px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    {onDeleteImage && (
                      <button
                        onClick={() => handleDeleteImage(image)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          width: '25px',
                          height: '25px',
                          background: 'linear-gradient(45deg, #DC143C, #8B0000)',
                          color: '#FFD700',
                          border: '2px solid #FFD700',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.6)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.2)';
                          e.currentTarget.style.boxShadow = '0 5px 15px rgba(220, 20, 60, 0.8)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.6)';
                        }}
                        title="🗑️ Delete image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {onUploadImages && (
            <div style={{ 
              margin: '15px 0', 
              padding: '15px', 
              background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.8), rgba(0, 0, 0, 0.8))',
              borderRadius: '10px',
              border: '2px solid rgba(135, 206, 235, 0.5)'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ 
                  color: '#87CEEB',
                  fontSize: '1.1rem',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>📸 Add Hero Images:</strong>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ 
                  marginBottom: '10px',
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid #87CEEB',
                  borderRadius: '5px',
                  color: '#FFF'
                }}
              />
              {selectedFiles.length > 0 && (
                <div>
                  <small style={{ 
                    color: '#87CEEB',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '5px 10px',
                    borderRadius: '15px'
                  }}>
                    📁 Selected: {selectedFiles.map(f => f.name).join(', ')}
                  </small>
                  <br />
                  <button
                    onClick={handleUpload}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      background: 'linear-gradient(45deg, #17a2b8, #20c997)',
                      color: '#FFF',
                      border: '2px solid #FFD700',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      boxShadow: '0 4px 12px rgba(23, 162, 184, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(23, 162, 184, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(23, 162, 184, 0.4)';
                    }}
                  >
                    🚀 Upload Images
                  </button>
                </div>
              )}
            </div>
          )}
          
          <small style={{ 
            color: '#B0C4DE',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: '5px 10px',
            borderRadius: '10px',
            display: 'inline-block'
          }}>
            🕒 Created: {new Date(superhero.created_at).toLocaleDateString()}
          </small>
        </div>
        
        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {onEdit && (
            <button 
              onClick={() => onEdit(superhero)}
              style={{ 
                padding: '10px 15px',
                background: 'linear-gradient(45deg, #007bff, #0056b3)',
                color: '#FFD700',
                border: '2px solid #FFD700',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 123, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
              }}
            >
              ✏️ Edit Hero
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={() => onDelete(superhero.id)}
              style={{ 
                padding: '10px 15px',
                background: 'linear-gradient(45deg, #dc3545, #c82333)',
                color: '#FFD700',
                border: '2px solid #FFD700',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(220, 53, 69, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.4)';
              }}
            >
              🗑️ Delete Hero
            </button>
          )}
        </div>
      </div>
    </div>
  );
};