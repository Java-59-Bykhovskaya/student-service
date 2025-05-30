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
};


export const countByNames = async (names) => {
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
    [`scores.${exam}`]: { $gte: minScore }
  }).toArray();
};
