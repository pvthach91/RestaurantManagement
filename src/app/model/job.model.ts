export class Job {
  id: number;
  position: string;
  description: string;
  experienceYear: number;
  educationLevel: string;
  expiredDate: string;
  dateCreated: string;
  salary: string;


  constructor(id: number, position: string, description: string, experienceYear: number, educationLevel: string, expiredDate: string, dateCreated: string, salary: string) {
    this.id = id;
    this.position = position;
    this.description = description;
    this.experienceYear = experienceYear;
    this.educationLevel = educationLevel;
    this.expiredDate = expiredDate;
    this.dateCreated = dateCreated;
    this.salary = salary;
  }
}
