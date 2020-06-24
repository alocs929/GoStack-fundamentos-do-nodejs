"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    // public all(): Transaction[] {
    //   return this.transactions;
    // }
    TransactionsRepository.prototype.all = function () {
        var transactionDTO = {
            transactions: this.transactions,
            balance: this.getBalance(),
        };
        return transactionDTO;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var incomeTransactions = this.transactions.filter(function (transaction) { return transaction.type === 'income'; });
        var outcomeTransactions = this.transactions.filter(function (transaction) { return transaction.type === 'outcome'; });
        var incomeTotalValue = incomeTransactions.reduce(function (sum, transaction) {
            return sum + transaction.value;
        }, 0);
        var outcomeTotalValue = outcomeTransactions.reduce(function (sum, transaction) {
            return sum + transaction.value;
        }, 0);
        var balance = {
            income: incomeTotalValue,
            outcome: outcomeTotalValue,
            total: incomeTotalValue - outcomeTotalValue,
        };
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        var transaction = new Transaction_1.default({
            title: title,
            type: type,
            value: value,
        });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
