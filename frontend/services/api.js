import axios from 'axios';

// Use a variável de ambiente VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

// Crie uma instância do axios com a URL base
const apiClient = axios.create({
  baseURL: API_URL,
});

export const getProfissionais = async () => {
  try {
    const response = await apiClient.get('/api/profissionais');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    throw error;
  }
};

// ... (se houver outras funções de API, como postProfissionais, elas também devem usar apiClient)