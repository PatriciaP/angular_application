import { Component } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  transactions: Transaction[] = [];
  newTransaction: Transaction = { id: 0, date: new Date, description: '', amount: 0 };
  editingTransaction: Transaction | null = null;


  transactionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.transactionForm = this.formBuilder.group({
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]

    });
  }

  ngOnInit() {
    this.http.get<Transaction[]>('/assets/data.json')
      .subscribe(transactions => this.transactions = transactions);
  }
  
 
  addTransaction() {
    if (this.newTransaction.date && this.newTransaction.description && this.newTransaction.amount) {
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
