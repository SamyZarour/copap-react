const { MongoClient } = require('mongodb');


export const wipeLocalDb = async () => {
    const connection = await MongoClient.connect('mongodb://localhost', { useNewUrlParser: true });
    const db = await connection.db('auth-dev');
    await db.dropDatabase();
    await connection.close();
};