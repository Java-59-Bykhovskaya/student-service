import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


const dbName = 'java59';
const client = new MongoClient(process.env.MONGODB_URI);
// const client = new MongoClient(process.env.MONGO_URI);
let collection;

export async function connect () {
  // if ((!client.topology && client.topology.isConnected())) {
  //   await client.connect();
  // }

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
  const student = await collection.findOneAndUpdate({ _id: id }, { $set: { [`scores.${examName}`]: score } }, { returnDocument: 'after' });
  if (student) {
    student.scores[examName] = score;
    return student;
  }
};

export const findStudentByName = async (name) => {
  await connect();
  return await collection.find({
    name: {
      $regex: `${name}`,
      $options: 'i'
    }
  }).toArray();

  // const res = [];
  // for (const id of students.keys()) {
  //   const student = students.get(id);
  //   if (student.name.toLowerCase() === name.toLowerCase()) {
  //     res.push(student);
  //   }
  // }
  // return res;
};

// export const countByNames = (names) => {
//   if (!Array.isArray(names)) findStudentByName(names).length;
//   else {
//     let count = 0;
//     names.forEach(name => {
//       for (const id of students.keys()) {
//         const student = students.get(id);
//         if (student.name.toLowerCase() === name.toLowerCase()) {
//           count++;
//         }
//       }
//     });
//     return count;
//   }
// };
//
// export const findStudentByMinScore = (exam, minScore) => {
//
// };
