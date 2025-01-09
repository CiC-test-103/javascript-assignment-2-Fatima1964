// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)

    /**
     * Creates a new account and adds it to the bank.
     * @param {string} name - The name of the account holder.
     * @param {number} initialDeposit - The initial deposit amount.
     * @returns {Account} - The newly created account.
     */

    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }
}

// Account Class: Represents a single user's account

    /**
     * Sets a new name for the account holder.
     * @param {string} newName - The new name for the account holder.
     */
    

class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionHistory.push({ transactionType: 'Deposit', amount });
        } else {
            throw new Error('Deposit amount must be positive.');
        }
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    /**
     * Withdraws a specified amount from the account.
     * @param {number} amount - The amount to withdraw.
     */
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount });
        } else {
            throw new Error('Insufficient balance or invalid amount.');
        }
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account receiving { transactionType: 'Received', amount: 300, from: senderName }
    /**
     * Transfers a specified amount to another account.
     * @param {number} amount - The amount to transfer.
     * @param {Account} recipientAccount - The account to receive the transfer.
     */

    transfer(amount, recipientAccount) {
        if (amount > 0 && amount <= this.balance) {
            this.withdraw(amount);
            recipientAccount.deposit(amount);
            this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });
        } else {
            throw new Error('Insufficient balance or invalid amount for transfer.');
        }
    }

    // Example: checkBalance()
    /**
     * Checks the current balance of the account.
     * @returns {number} - The current balance of the account.
     */
    
    checkBalance() {
        return this.balance;
    }
    
}


//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
