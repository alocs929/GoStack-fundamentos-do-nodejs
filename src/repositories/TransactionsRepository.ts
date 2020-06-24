import Transaction from '../models/Transaction';
// import transactionRouter from '../routes/transaction.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface TransactionDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // public all(): Transaction[] {
  //   return this.transactions;
  // }
  public all(): TransactionDTO {
    const transactionDTO = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return transactionDTO;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const incomeTotalValue = incomeTransactions.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);
    const outcomeTotalValue = outcomeTransactions.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);
    const balance = {
      income: incomeTotalValue,
      outcome: outcomeTotalValue,
      total: incomeTotalValue - outcomeTotalValue,
    };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
