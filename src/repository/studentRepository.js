import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


const dbName = 'java59';
const client = new MongoClient(process.env.MONGODB_URI);
let collection;

export async function connect () {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  const db = client.db(dbName);
  collection = db.collection('college');
}


export const addStudent = async ({ id, name, password }) => {
  await connect();
  const exists = await collection.findOne({ _id: { id } });
  if (exists) {
    return false;
  }
  await collection.insertOne({ _id: id, name, password, scores: {} });
  return true;
};


export const findStudent = async (id) => {
  await connect();
  return await collection.findOne({ _id: id });
};

export const deleteStudent = async (id) => {
  await connect();
  return await collection.findOneAndDelete({ _id: id });
};

export const updateStudent = async (id, data) => {
  await connect();
  return collection.findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' });
};

export const addScore = async (id, { examName, score }) => {
  await connect();
  return await collection.findOneAndUpdate({ _id: id }, { $set: { [`scores.${examName}`]: score } }, { returnDocument: 'after' });
};

export const findStudentByName = async (name) => {
  await connect();


  return await collection.find({
    name: {
      $regqx: `${name}`,
      $options: 'i'
    }
  }).toArray();

};

export const countByNames = async (names) => {
  await connect();
  if (typeof names === 'string') names = [names];
  const regexNames = names.map(name => new RegExp(`^${name}$`, 'i'));
  return await collection.countDocuments({
    name: {
      $in: regexNames
    }
  });
};

export const findByMinScore = async (exam, minScore) => {
  return await collection.find({
    [`score.${exam}`]: { $gte: minScore }
  }).toArray();
};
