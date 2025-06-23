const accounts = [
    {id: 1, owner: "Alice", balance: 500},
    {id: 2, owner: "Bob", balance: 300}
];
 // Function to get an account by its ID
function getAccountById (id)
{
    for (const account of accounts)
    {
        if (account.id === id)
        {
            return account;
        }
    }
}
 // Function to create a new account
function createAccount (newAccountId, newAccountOwner)
{
    const account = getAccountById(newAccountId);
 
    if (account)
    {
        throw new Error("Account already exists.");
    }
 
    if (!Number.isFinite(newAccountId) || newAccountId <= 0)
    {
        throw new Error("Invalid value for account ID: The account ID must be a positive finite integer.");
    }
 
    if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "")
    {
        throw new Error("Invalid account owner: The account owner must be a non-empty string.");
    }
 
    accounts.push(
        {
            id: newAccountId,
            owner: newAccountOwner,
            balance: 0
        }
    );
}
 // Function to deposit money into an account
function depositMoney (accountId, amount)
{
    const account = getAccountById(accountId);
 
    if (!account)
    {
        throw new Error("Account not found");
    }
 
    if (!Number.isFinite(amount) || amount <= 0)
    {
        throw new Error("Invalid value for deposit amount: The amount must be a positive finite number.");
    }
 
    account.balance += amount;
}
 // Function to withdraw money from an account
function withdrawMoney (accountId, amount)
{
    const account = getAccountById(accountId);
 
    if (!account)
    {
        throw new Error("Account not found.");
    }
 
    if (!Number.isFinite(amount) || amount <= 0)
    {
        throw new Error("Invalid value for withdrawal amount: The amount must be a positive finite number.");
    }
 
    if (account.balance < amount)
    {
        throw new Error("Insufficient funds for withdrawal.");
    }
 
    account.balance -= amount;
}
 // Function to transfer money between accounts
function transferMoney (fromAccountId, toAccountId, amount)
{
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);
 
    if (!fromAccount)
    {
        throw new Error("Source account not found.");
    }
 
    if (!toAccount)
    {
        throw new Error("Destination account not found.");
    }
 
    if (!Number.isFinite(amount) || amount <= 0)
    {
        throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
    }
 
    if (fromAccount.balance < amount)
    {
        throw new Error("Insufficient funds for transfer.");
    }
 
    fromAccount.balance -= amount;
    toAccount.balance += amount;
}
// // Still in progress
// ID = 0;
// owner ="";
// balance = 0;
 
// function getAccountById(ID){
   
//     return ID;
 
// }
// function createAccount(ID, newOwner){
//     this.ID = ID;
//     newAcc =
//     {
//     ID : 0,
//     owner :"",
//     balance : 0
//     };
//     return newOwner;
 
// }
// function depositMoney(ID, depMoney){
//     if(balance > 0){
//         this.balance = balance + depMoney;
//     }
//     return ID;
 
// }
// function withdrawMoney(ID, amountWithdraw){
//     if(balance > 0){
//         this.balance = balance - amountWithdraw;
//     }
//     return ID;
 
// }
// function transferMoney(ID, ID2){
//     if(balance > 0){
//         this.balance = balance - ID2;
//     }
//     return ID;
 
// }