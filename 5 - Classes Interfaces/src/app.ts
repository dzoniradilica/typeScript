class Department {
  //   private name: string;
  private employees: string[] = [];

  constructor(private name: string, public readonly id: string) {
    // this.name = n;
  }

  describe() {
    console.log('Department:' + this.name + this.id);
  }

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
}

class AccountingDepartment extends Department {
  private lastReporte: string;
  reports: string[];

  constructor(id: string) {
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
}

const acc = new AccountingDepartment('ok');
acc.addReports('opic');

console.log(acc.reports);

// acc.readLastReporte;

console.log(acc);
