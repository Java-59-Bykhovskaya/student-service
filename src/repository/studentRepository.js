let collection;

export function init (db) {
  collection = db.collection('college');
}

export const addStudent = async ({ id, name, password }) => {
  const exists = await collection.findOne({ _id: { id } });
  if (exists) {
    return false;
  }
  await collection.insertOne({ _id: id, name, password, scores: {} });
  return true;
};


export const findStudent = async (id) => {
  return await collection.findOne({ _id: id });
};

export const deleteStudent = async (id) => {
  return await collection.findOneAndDelete({ _id: id });

};

export const updateStudent = async (id, data) => {
  return collection.findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' });
};

export const addScore = async (id, { examName, score }) => {
  const student = await collection.findOneAndUpdate({ _id: id }, { $set: { [`scores.${examName}`]: score } }, { returnDocument: 'after' });
  if (student) {
    student.scores[examName] = score;
    return student;
  }
};

export const findStudentByName = async (name) => {
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
