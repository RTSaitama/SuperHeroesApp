import request from 'supertest';
import app from '../server';
describe('Superhero API', () => {
  describe('GET /api/superheroes', () => {
    it('should return list of superheroes', async () => {
      const response = await request(app)
        .get('/api/superheroes')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return paginated results', async () => {
      const response = await request(app)
        .get('/api/superheroes?page=1&limit=2')
        .expect(200);

      expect(response.body.pagination.currentPage).toBe(1);
      expect(response.body.pagination.itemsPerPage).toBe(2);
    });
  });

  describe('POST /api/superheroes', () => {
    it('should create a new superhero', async () => {
      const newSuperhero = {
        nickname: 'Test Hero',
        real_name: 'Test Name',
        origin_description: 'Test origin',
        superpowers: 'Test powers',
        catch_phrase: 'Test phrase'
      };

      const response = await request(app)
        .post('/api/superheroes')
        .send(newSuperhero)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nickname).toBe('Test Hero');
      expect(response.body.real_name).toBe('Test Name');
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidSuperhero = {
        nickname: '', 
        real_name: ''  
      };

      await request(app)
        .post('/api/superheroes')
        .send(invalidSuperhero)
        .expect(400);
    });
  });

  describe('DELETE /api/superheroes/:id', () => {
    it('should return 404 for non-existent superhero', async () => {
      await request(app)
        .delete('/api/superheroes/non-existent-id')
        .expect(404);
    });
  });
});