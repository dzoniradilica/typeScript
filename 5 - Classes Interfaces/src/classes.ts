abstract class Department {
  //   private name: string;
  private employees: string[] = [];

  constructor(protected name: string, public readonly id: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  private lastReport: string;

  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'djes');
    this.admins = admins;
    this.lastReport = admins[0];
  }

  describe(this: Department): void {
    console.log(`IT Departman: ${this.id}`);
  }
}

class AccountingDepartment extends Department {
  private lastReporte: string;
  reports: string[];
  private static instance: AccountingDepartment;

  private constructor(id: string) {
    super(id, 'newID');
    this.reports = [];
    this.lastReporte = this.reports[0];
  }

  addReports(text: string) {
    this.reports.push(text);
  }

  get readLastReporte() {
    if (this.lastReporte) {
      return this.lastReporte;
    } else throw new Error('ne valja');
  }

  describe() {
    console.log(`accID: ${this.id}`);
  }

  static getInstnace() {
    if (AccountingDepartment.instance) return this.instance;

    this.instance = new AccountingDepartment('20d');

    return this.instance;
  }
}

const employee1 = Department.createEmployee('dzoni');

console.log(employee1);

const acc = AccountingDepartment.getInstnace();
acc.describe();

// console.log(acc.reports);

// acc.readLastReporte;

// console.log(acc);
