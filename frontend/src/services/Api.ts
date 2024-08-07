import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const createSession = async (email: string, password: string) => {
  return api.post('/users/login', { email: email, password: password });
};

export const getUserById = async (id: string, token: string) => {
  return api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const validateToken = async (token: string) => {
  return api.get('/users/validate-token', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = async (username: string, email: string, password: string) => {
  return api.post('/users', {username, email, password});
}

export const createCharacter = async (name: string, classes: string, genre: string, specie: string, background: string, userId: string, tableId: string, systemId: string) => {
  return api.post('/character', {name, classes, genre, specie, background, userId, tableId, systemId});
} 