export class Report {
  totalIncome: number;
  totalExpense: number;
  incomeLabels: Array<string>;
  incomeData: Array<number>;
  expenseLabels: Array<string>;
  expenseData: Array<number>;


  constructor(totalIncome: number, totalExpense: number, incomeLabels: Array<string>, incomeData: Array<number>, expenseLabels: Array<string>, expenseData: Array<number>) {
    this.totalIncome = totalIncome;
    this.totalExpense = totalExpense;
    this.incomeLabels = incomeLabels;
    this.incomeData = incomeData;
    this.expenseLabels = expenseLabels;
    this.expenseData = expenseData;
  }
}

