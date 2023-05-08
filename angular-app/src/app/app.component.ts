import { Component } from '@angular/core';
import { Transaction } from './transaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  transactions: Transaction[] = [
    { id: 1, date: new Date('2022-05-01'), description: 'Salary', amount: 5000 },
    { id: 2, date: new Date('2022-05-02'), description: 'Rent', amount: -1000 },
    { id: 3, date: new Date('2022-05-03'), description: 'Groceries', amount: -200 }
  ];
  
  newTransaction: Transaction = { id: 0, date: new Date, description: '', amount: 0 };
  editingTransaction: Transaction | null = null;

  addTransaction() {
    if (this.newTransaction.description && this.newTransaction.amount) {
      this.newTransaction.id = this.transactions.length + 1;
      this.transactions.push(this.newTransaction);
      this.newTransaction = { id: 0, date: new Date, description: '', amount: 0 };
    }
  }

  deleteTransaction(id: number) {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
  }

  editTransaction(transaction: Transaction) {
    this.editingTransaction = { ...transaction };
  }

  saveTransaction() {
    if (this.editingTransaction) {
      const index = this.transactions.findIndex((transaction) => transaction.id === this.editingTransaction!.id);
      if (index !== -1) {
        this.transactions[index] = this.editingTransaction;
        this.editingTransaction = null;
      }
    }
  }

  cancelEditing() {
    this.editingTransaction = null;
  }

  calculateBalance() {
    return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

}
