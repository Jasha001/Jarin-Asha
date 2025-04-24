const fs = require('fs/promises');
const Student = require('./student');

class Course {
  constructor(title, description, duration) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  async saveToFile(filename) {
    try {
      const jsonData = JSON.stringify(this);
      await fs.writeFile(filename, jsonData);
      console.log(`Course data saved to ${filename}`);
    } catch (error) {
      console.error(`Error saving course data: ${error}`);
    }
  }

  static async loadFromFile(filename) {
    try {
      const fileContent = await fs.readFile(filename, 'utf-8');
      const { title, description, duration, students } = JSON.parse(fileContent);
      const course = new Course(title, description, duration);
      course.students = students.map(s => new Student(s.name, s.age, s.subjects));
      return course;
    } catch (error) {
      console.error(`Error loading course data: ${error}`);
    }
  }
}

module.exports = Course;
