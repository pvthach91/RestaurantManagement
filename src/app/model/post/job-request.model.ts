export class JobRequest {
  id: number;
  position: string;
  description: string;
  experienceYear: number;
  educationLevel: string;
  expiredDate: string;
  salary: string;


  constructor(id: number, position: string, description: string, experienceYear: number, educationLevel: string, expiredDate: string, salary: string) {
    this.id = id;
    this.position = position;
    this.description = description;
    this.experienceYear = experienceYear;
    this.educationLevel = educationLevel;
    this.expiredDate = expiredDate;
    this.salary = salary;
  }
}
