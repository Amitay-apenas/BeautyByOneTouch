const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Conexão com MongoDB bem sucedida ${conn.connection.host}`)
    } catch (err) {
        console.log(`Erro ao conectar com o banco de dados: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;