"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        if (type !== 'income' && type !== 'outcome') {
            throw Error('Type invalid.');
        }
        var balance = this.transactionsRepository.getBalance();
        var outTotal = balance.total;
        if (type === 'outcome' && value > outTotal) {
            throw Error('Insufficient value.');
        }
        var transaction = this.transactionsRepository.create({
            title: title,
            type: type,
            value: value,
        });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
