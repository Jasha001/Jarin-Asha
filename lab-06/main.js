const Student = require('./student');
const Course = require('./course');

// Create students
const student1 = new Student('Alice', 20, ['Math', 'English']);
const student2 = new Student('Bob', 22);
student2.addSubject('Science');
student2.addSubject('History');

// Create course and add students
const course = new Course('Web Programming', 'Learn Node.js basics', '3 months');
course.addStudent(student1);
course.addStudent(student2);

// Serialize course to JSON
const courseJSON = course.toJSON();
console.log('Serialized Course:', courseJSON);

// Deserialize back to Course object
const loadedCourse = Course.fromJSON(courseJSON);
console.log('\nDeserialized Course Details:');
loadedCourse.students.forEach(s => {
  console.log(`Name: ${s.name}, Age: ${s.age}, Subjects: ${s.subjects.join(', ')}`);
});

// Type checking functions
function isString(value) {
  return typeof value === 'string';
}

function validateStudent(student) {
  return (
    typeof student.name === 'string' &&
    typeof student.age === 'number' &&
    Array.isArray(student.subjects)
  );
}

// Example validation
console.log('\nType Check:');
console.log('Is "hello" a string?', isString('hello'));
console.log('Is student1 valid?', validateStudent(student1));
