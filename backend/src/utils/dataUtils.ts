import fs from 'fs';
import path from 'path';
import { Superhero } from '../types/superhero';

const DATA_FILE = path.join(__dirname, '../../data/superheroes.json');

interface DataStructure {
  superheroes: Superhero[];
  nextId: number;
}

export const readData = (): DataStructure => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { superheroes: [], nextId: 1 };
  }
};

export const writeData = (data: DataStructure): void => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
  }
};