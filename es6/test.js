class Student {
  constructor (name, major, sex) {
    this.name = name;
    this.major = major;
    this.sex;
  }

  displayInfo() {
    console.log(`${this.name} is a ${this.major} student.`);
  }
}

const richard = new Student('Richard', 'Music');
const james = new Student('James', 'Electrical Engineering');
