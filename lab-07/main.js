const Course = require('./course');
const Student = require('./student');

async function main() {
  const course = new Course('Math 101', 'Introduction to Algebra', 3);
  course.addStudent(new Student('John Doe', 20, ['Algebra', 'Calculus']));
  course.addStudent(new Student('Jane Smith', 22, ['Geometry', 'Statistics']));

  // Save the course to a file
  await course.saveToFile('course.json');

  // Load the course back from the file
  const loadedCourse = await Course.loadFromFile('course.json');
  if (loadedCourse) {
    console.log('\nLoaded Course:');
    loadedCourse.students.forEach(s => {
      console.log(`Name: ${s.name}, Age: ${s.age}, Subjects: ${s.subjects.join(', ')}`);
    });
  }
}

main();
