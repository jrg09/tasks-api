const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.STR_CONN);
        console.log(`Mongo DB conectada at ${new Date().toLocaleString()}`);
    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar la base de datos con MongoDB");
    }
};

const dbDisconnect = async () => {
    await mongoose.disconnect();
};

module.exports = { dbConnection, dbDisconnect };
