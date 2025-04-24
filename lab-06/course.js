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

  getAverageAge() {
    if (this.students.length === 0) return 0;
    const totalAge = this.students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / this.students.length;
  }

  toJSON() {
    return JSON.stringify(this);
  }

  static fromJSON(jsonString) {
    const obj = JSON.parse(jsonString);
    const course = new Course(obj.title, obj.description, obj.duration);
    obj.students.forEach(s => {
      const student = new Student(s.name, s.age, s.subjects);
      course.addStudent(student);
    });
    return course;
  }
}

module.exports = Course;
