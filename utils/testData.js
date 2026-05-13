const { faker } = require('@faker-js/faker');

const hobbyOrder = ['Sports', 'Reading', 'Music'];
const subjectOptions = ['Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'English'];
const stateCityPairs = [
  { state: 'NCR', city: 'Delhi' },
  { state: 'Uttar Pradesh', city: 'Lucknow' },
  { state: 'Haryana', city: 'Karnal' },
  { state: 'Rajasthan', city: 'Jaipur' },
];

function generatePracticeFormData() {
  const birthDate = faker.date.birthdate({ min: 18, max: 45, mode: 'age' });
  const hobbies = faker.helpers.arrayElements(hobbyOrder, 2);
  const orderedHobbies = hobbyOrder.filter((hobby) => hobbies.includes(hobby));
  const { state, city } = faker.helpers.arrayElement(stateCityPairs);
  const day = String(birthDate.getDate()).padStart(2, '0');

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    mobile: faker.string.numeric(10),
    dateOfBirth: {
      day: birthDate.getDate(),
      monthIndex: birthDate.getMonth(),
      monthName: birthDate.toLocaleString('en-US', { month: 'long' }),
      year: birthDate.getFullYear(),
      formatted: `${day} ${birthDate.toLocaleString('en-US', { month: 'long' })},${birthDate.getFullYear()}`,
    },
    subjects: [faker.helpers.arrayElement(subjectOptions)],
    hobbies: orderedHobbies,
    pictureFileName: 'test-upload.txt',
    currentAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
    state,
    city,
  };
}

function generateNegativePracticeFormData() {
  return {
    firstName: '',
    lastName: '',
    mobile: faker.string.numeric(5),
  };
}

function generateTextBoxData() {
  return {
    fullName: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    currentAddress: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    permanentAddress: `${faker.location.streetAddress()}, ${faker.location.city()}`,
  };
}

function generateInvalidEmail() {
  return `${faker.internet.username()}-invalid.example.com`;
}

function generatePromptText() {
  return faker.lorem.words({ min: 2, max: 4 });
}

module.exports = {
  generateInvalidEmail,
  generateNegativePracticeFormData,
  generatePracticeFormData,
  generatePromptText,
  generateTextBoxData,
};
