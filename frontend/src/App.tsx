 import React, { useEffect, useState } from 'react';
import { useSuperheroStore } from './stores/superheroStore';
import { SuperheroList } from './components/superheroList';
import { SuperheroForm } from './components/superheroForm';
import { Pagination } from './components/Pagination';
import { CreateSuperheroRequest, Superhero } from './types/superhero';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingSuperhero, setEditingSuperhero] = useState<Superhero | null>(null);
  
  const { 
    superheroes, 
    loading, 
    error, 
    pagination,
    fetchSuperheroes,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
    uploadImages,
    deleteImage,  
    clearError 
  } = useSuperheroStore();

  useEffect(() => {
    fetchSuperheroes(1);
  }, [fetchSuperheroes]);

  const handleCreateSuperhero = async (data: CreateSuperheroRequest) => {
    if (editingSuperhero) {
      await updateSuperhero(editingSuperhero.id, data);
      setEditingSuperhero(null);
    } else {
      await createSuperhero(data);
    }
    setShowForm(false);
  };

  const handlePageChange = (page: number) => {
    fetchSuperheroes(page);
  };

  const handleEdit = (superhero: Superhero) => {
    setEditingSuperhero(superhero);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this superhero?')) {
      await deleteSuperhero(id);
    }
  };

  const handleUploadImages = async (id: string, files: File[]) => {
    await uploadImages(id, files);
  };

  const handleDeleteImage = async (id: string, imageName: string) => {
    await deleteImage(id, imageName);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSuperhero(null);
  };

  const handleAddNew = () => {
    setEditingSuperhero(null);
    setShowForm(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundImage: 'url("/images/bg.webp")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 32, 96, 0.6), rgba(220, 20, 60, 0.4))',
        zIndex: 0
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px' 
      }}>
        <header style={{ 
          marginBottom: '30px', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FFD700, #FF6B35, #DC143C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '3px 3px 0px rgba(0,0,0,0.8), 6px 6px 0px rgba(0,0,0,0.4)',
            marginBottom: '10px',
            letterSpacing: '2px',
            transform: 'perspective(500px) rotateX(15deg)',
            animation: 'heroGlow 2s infinite alternate'
          }}>
            🦸‍♂️ SUPERHEROES Base 🦸‍♀️
          </h1>
          
          <p style={{ 
            color: '#FFD700',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '20px',
            border: '2px solid #FFD700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
          }}>
            ⚡ Manage Your Legendary Heroes ⚡
          </p>
        </header>

        {error && (
          <div style={{ 
            backgroundColor: 'rgba(220, 20, 60, 0.9)', 
            color: '#FFD700', 
            padding: '15px', 
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '2px solid #FFD700',
            boxShadow: '0 0 15px rgba(220, 20, 60, 0.7)'
          }}>
            <span style={{ fontWeight: 'bold' }}>⚠️ Error: {error}</span>
            <button 
              onClick={clearError}
              style={{ 
                backgroundColor: 'transparent',
                border: '2px solid #FFD700',
                color: '#FFD700',
                padding: '5px 10px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button 
            onClick={showForm ? handleCancelForm : handleAddNew}
            style={{ 
              background: showForm 
                ? 'linear-gradient(45deg, #666, #999)' 
                : 'linear-gradient(45deg, #FF6B35, #DC143C, #8B0000)',
              color: '#FFD700',
              border: '3px solid #FFD700',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              boxShadow: showForm 
                ? '0 5px 15px rgba(0,0,0,0.5)' 
                : '0 5px 15px rgba(220, 20, 60, 0.6), 0 0 25px rgba(255, 107, 53, 0.4)',
              transform: showForm ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!showForm) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 20, 60, 0.8), 0 0 35px rgba(255, 107, 53, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showForm) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(220, 20, 60, 0.6), 0 0 25px rgba(255, 107, 53, 0.4)';
              }
            }}
          >
            {showForm ? '🚫 Cancel Mission' : '🚀 Add New Hero'}
          </button>
        </div>

        {showForm && (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '3px solid #FFD700',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
            marginBottom: '30px'
          }}>
            <SuperheroForm
              onSubmit={handleCreateSuperhero}
              onCancel={handleCancelForm}
              loading={loading}
              editingSuperhero={editingSuperhero}
            />
          </div>
        )}

        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '15px',
          padding: '20px',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        }}>
          <SuperheroList
            superheroes={superheroes}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUploadImages={handleUploadImages}
            onDeleteImage={handleDeleteImage}  
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <style>{`
        @keyframes heroGlow {
          0% { filter: drop-shadow(0 0 5px #FFD700); }
          100% { filter: drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 30px #FF6B35); }
        }
      `}</style>
    </div>
  );
}

export default App;