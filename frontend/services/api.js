import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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

//NÃO ESQUEÇA DE USAR ESTE CÓDIGO PARA ADICIONAR OUTROS METODOS POST