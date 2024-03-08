abstract class Department {
  static fiscalYear = 2020;
  //   private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, public admins2: string[]) {
    super(id, 'IT');
    this.admins = admins2;
  }

  describe(): void {
    console.log(`IT Departmant: ${this.id}`);
  }
}

class AccountingDepartment extends Department {
  private lastReporte: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReporte) return this.lastReporte;
    throw new Error('No report found');
  }

  set mostRecentReport(value: string) {
    if (!value) return;
    this.addReports(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReporte = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('s2', []);
    return this.instance;
  }

  addEmployee(name: string) {
    if (name === 'Nikola') return;

    this.employees.push(name);
  }

  addReports(text: string) {
    this.reports.push(text);
    this.lastReporte = this.reports[0];
  }

  printReports() {
    console.log(this.reports);
  }

  describe(): void {}
}

const employee1 = Department.createEmployee('Dzoni');
console.log(employee1, Department.fiscalYear);

const itAcc = new ITDepartment('d5', ['dzoni']);

itAcc.describe();

itAcc.addEmployee('Dzoni');
itAcc.addEmployee('Nikola');

itAcc.printEmployeeInformation();

console.log(itAcc);

// const accounting = new AccountingDepartment('a2', []);
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = 'Sta ima braco gde ste';
accounting.addReports('Something went wrong');

accounting.printReports();

accounting.addEmployee('Dzoni');
accounting.printEmployeeInformation();

console.log(accounting.mostRecentReport);

// const accCopy = { desrcibe: accounting.describe, name: 'Dzoni' };

// accCopy.desrcibe();
