import { v4 as uuidv4 } from 'uuid';
import { cwd } from 'node:process';
import { join } from 'node:path';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';

export default class DatabaseService {
  database = [];
  filePath = join(cwd(), '../backend', 'project_08_database.json');

  constructor() {
    if (existsSync(this.filePath)) {
      try {
        const fileContent = readFileSync(this.filePath, 'utf-8');
        this.database = fileContent ? JSON.parse(fileContent) : [];
      } catch (e) {
        console.error('DATABASE ERROR', e);
        this.database = [];
      }
    } else {
      writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  getAll() {
    return this.database;
  }

  getOne(data) {
    const found = this.database.find((item) => {
      return item.phone === data || item.name === data;
    });

    return [found];
  }

  create(data) {
    try {
      const itemWithId = { ...data, id: uuidv4() };
      this.database.push(itemWithId);
      this.storeToDisk();
      return itemWithId; 
    } catch (e) {
      console.error('DATABASE ERROR', e);
      return null;
    }
  }

  update(id, newData) {
    const foundIndex = this.database.findIndex((item) => item.id === id);
    if (foundIndex === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
  
    const updatedItem = { ...this.database[foundIndex], ...newData };
  
    this.database[foundIndex] = updatedItem;
    this.storeToDisk();
    return updatedItem; 
  }
  

  delete(id) {
    console.log(id);
    try {
      this.database = this.database.filter((item) => {
        return item.id !== id;
      });
      this.storeToDisk();
      return true;
    } catch (e) {
      console.error('DATABASE ERROR', e);
      return false;
    }
  }

  storeToDisk() {
    try {
      writeFileSync(this.filePath, JSON.stringify(this.database));
    } catch (e) {
      console.error('DATABASE ERROR', e);
    }
  }
}
