// src/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Importe o módulo 'path'

const envPath = path.join(__dirname, '../.env');

// Carrega as variáveis de ambiente
dotenv.config({ path: envPath }); 

const Profissional = require('./models/Profissional');
const Horario = require('./models/Horario');

// Verifique se a variável está sendo lida
console.log('MONGO_URI:', process.env.MONGO_URI);

// Conecta ao banco de dados
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
    process.exit(1);
  }
};

// Dados de exemplo (SUBSTITUA ESTES DADOS COM OS SEUS!)
const profissionaisData = [
  // Cabelereiras
  {
    nomeDoLugar: 'Cabeleireira Leila',
    descricao: 'Especialista em cortes modernos, coloração e tratamentos capilares.',
    fotoUrl: 'https://images.pexels.com/photos/10182415/pexels-photo-10182415.jpeg',
    telefone: '(11) 98765-1111',
  },
  {
    nomeDoLugar: 'Salão Estilo & Charme',
    descricao: 'Cortar, colorir e hidratar. Deixe seu cabelo brilhar como nunca!',
    fotoUrl: 'https://images.pexels.com/photos/10182415/pexels-photo-10182415.jpeg',
    telefone: '(11) 98765-2222',
  },
  {
    nomeDoLugar: 'Ateliê do Cabelo',
    descricao: 'Temos as melhores técnicas de alisamento e progressiva.',
    fotoUrl: 'https://images.pexels.com/photos/7176465/pexels-photo-7176465.jpeg',
    telefone: '(11) 98765-3333',
  },
  
  // Manicures e Pedicures
  {
    nomeDoLugar: 'Espaço Manicure e Pedicure',
    descricao: 'Cuidados completos para mãos e pés. Ambiente relaxante e higiênico.',
    fotoUrl: 'https://images.pexels.com/photos/4042803/pexels-photo-4042803.jpeg',
    telefone: '(11) 98765-7777',
  },
  {
    nomeDoLugar: 'Unhas de Princesa',
    descricao: 'Faça as unhas mais lindas e delicadas para qualquer ocasião.',
    fotoUrl: 'https://images.pexels.com/photos/4042803/pexels-photo-4042803.jpeg',
    telefone: '(11) 98765-8888',
  },
  {
    nomeDoLugar: 'Unhas Poderosas',
    descricao: 'Temos os esmaltes mais modernos e as tendências do momento.',
    fotoUrl: 'https://images.pexels.com/photos/4042803/pexels-photo-4042803.jpeg',
    telefone: '(11) 98765-9999',
  },
  {
    nomeDoLugar: 'Foot Spa & Manicure',
    descricao: 'Tratamentos especiais para os pés cansados e esfoliação completa.',
    fotoUrl: 'https://images.pexels.com/photos/3382753/pexels-photo-3382753.jpeg',
    telefone: '(11) 98765-1010',
  },

  // Estética e Maquiagem
  {
    nomeDoLugar: 'Clínica de Estética Mulher',
    descricao: 'Tratamentos faciais, massagens modeladoras e limpeza de pele.',
    fotoUrl: 'https://images.pexels.com/photos/7414073/pexels-photo-7414073.jpeg',
    telefone: '(11) 98765-1122',
  },
  {
    nomeDoLugar: 'Studio de Maquiagem Profissional',
    descricao: 'Maquiagem para festas, casamentos, formaturas e ensaios fotográficos.',
    fotoUrl: 'https://images.pexels.com/photos/7414073/pexels-photo-7414073.jpeg',
    telefone: '(11) 98765-1133',
  },
  {
    nomeDoLugar: 'Sobrancelhas Perfeitas',
    descricao: 'Design de sobrancelhas, microblading e preenchimento.',
    fotoUrl: 'https://images.pexels.com/photos/7414073/pexels-photo-7414073.jpeg',
    telefone: '(11) 98765-1144',
  },
  {
    nomeDoLugar: 'Depilação e Cera',
    descricao: 'Serviços de depilação com cera quente e fria, com máxima higiene.',
    fotoUrl: 'https://images.pexels.com/photos/7414073/pexels-photo-7414073.jpeg',
    telefone: '(11) 98765-1155',
  },
  
  // Design de Sobrancelhas e Alongamentos
  {
    nomeDoLugar: 'Micropigmentação Studio',
    descricao: 'Micropigmentação de sobrancelhas, lábios e olhos.',
    fotoUrl: 'https://images.pexels.com/photos/3773129/pexels-photo-3773129.jpeg',
    telefone: '(11) 98765-1177',
  },
  {
    nomeDoLugar: 'Alongamento de Cílios',
    descricao: 'Especialistas em alongamento de cílios fio a fio e volume russo.',
    fotoUrl: 'https://images.pexels.com/photos/1018619/pexels-photo-1018619.jpeg',
    telefone: '(11) 98765-1188',
  },
  {
    nomeDoLugar: 'Design de Sobrancelhas',
    descricao: 'Técnicas de design e henna para um olhar marcante.',
    fotoUrl: 'https://images.pexels.com/photos/3997976/pexels-photo-3997976.jpeg',
    telefone: '(11) 98765-1199',
  },
  {
    nomeDoLugar: 'Esmalteria & Sobrancelhas',
    descricao: 'Combinação perfeita entre unhas impecáveis e sobrancelhas bem definidas.',
    fotoUrl: 'https://images.pexels.com/photos/11090333/pexels-photo-11090333.jpeg',
    telefone: '(11) 98765-1211',
  },

  // Vários Serviços
  {
    nomeDoLugar: 'Centro de Beleza Única',
    descricao: 'Tudo o que você precisa em um só lugar: unhas, cabelo, depilação.',
    fotoUrl: 'https://images.pexels.com/photos/11090333/pexels-photo-11090333.jpeg',
    telefone: '(11) 98765-1222',
  },
  {
    nomeDoLugar: 'Beleza Completa Studio',
    descricao: 'Cortes, maquiagem e design de sobrancelhas em um ambiente aconchegante.',
    fotoUrl: 'https://images.pexels.com/photos/11090333/pexels-photo-11090333.jpeg',
    telefone: '(11) 98765-1233',
  },
  {
    nomeDoLugar: 'Salão Divas',
    descricao: 'Deixe-nos cuidar de você, desde o cabelo aos pés.',
    fotoUrl: 'https://images.pexels.com/photos/11090333/pexels-photo-11090333.jpeg',
    telefone: '(11) 98765-1244',
  },
  {
    nomeDoLugar: 'Beleza e Bem-Estar',
    descricao: 'Um espaço para se sentir linda e relaxada, com os melhores profissionais.',
    fotoUrl: 'https://images.pexels.com/photos/10182415/pexels-photo-10182415.jpeg',
    telefone: '(11) 98765-1255',
  },
  {
    nomeDoLugar: 'Glamour & Estilo',
    descricao: 'Transforme seu visual e eleve sua autoestima conosco.',
    fotoUrl: 'https://images.pexels.com/photos/7176465/pexels-photo-7176465.jpeg',
    telefone: '(11) 98765-1266',
  },
];

// Função para importar os dados
const importData = async () => {
  try {
    // Conecta ao banco
    await connectDB();

    // Limpa os dados existentes
    console.log('Limpando dados antigos...');
    await Profissional.deleteMany();
    await Horario.deleteMany();

    // Insere os novos profissionais
    console.log('Importando profissionais...');
    const profissionais = await Profissional.insertMany(profissionaisData);

    // Insere horários para cada profissional
    console.log('Importando horários...');
    for (const profissional of profissionais) {
      // Cria 5 horários de exemplo para cada profissional
      const horariosDoDia = [
        { profissional: profissional._id, data: new Date('2025-09-01T09:00:00Z'), horariosDisponiveis: ['09:00', '10:00', '11:00'] },
        { profissional: profissional._id, data: new Date('2025-09-02T13:00:00Z'), horariosDisponiveis: ['13:00', '14:00', '15:00'] },
        { profissional: profissional._id, data: new Date('2025-09-03T16:00:00Z'), horariosDisponiveis: ['16:00', '17:00'] },
      ];
      await Horario.insertMany(horariosDoDia);
    }

    console.log('Dados importados com sucesso!');
    process.exit();
  } catch (err) {
    console.error(`Erro ao importar dados: ${err.message}`);
    process.exit(1);
  }
};

// Função para deletar os dados
const deleteData = async () => {
  try {
    await connectDB();
    console.log('Limpando dados...');
    await Profissional.deleteMany();
    await Horario.deleteMany();
    console.log('Dados deletados com sucesso!');
    process.exit();
  } catch (err) {
    console.error(`Erro ao deletar dados: ${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log("Comando inválido. Use '-i' para importar ou '-d' para deletar.");
  process.exit(1);
}