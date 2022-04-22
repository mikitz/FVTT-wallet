/**
 * A single ToDo in our list of Todos.
 * @typedef {Object} ToDo
 * @property {string} id - A unique ID to identify this todo.
 * @property {string} label - The text of the todo.
 * @property {boolean} isDone - Marks whether the todo is done.
 * @property {string} actorID - The user who owns this todo.
*/
// The module's class
class Wallet {
    static ID = 'FVTT-wallet'

    static FLAGS = {
        TRANSACTIONS: 'transactions'
    }
      
    static TEMPLATES = {
        WALLET: `modules/${this.ID}/templates/wallet.hbs`
    }

    /**
     * A small helper function which leverages developer mode flags to gate debug logs.
     * @param {boolean} force - forces the log even if the debug flag is not on
     * @param  {...any} args - what to log
    */
    static log(force, ...args) {  
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
        if (shouldLog) {
            console.log(this.ID, '|', ...args);
        }
    }
    
}
// Hook into the character sheet
Hooks.on('renderActorSheet', (app, html, data) => {
    // Logs for Stuff
        Wallet.log(false, "Actor Name:", data.actor.name)
        Wallet.log(false, "Actor ID:", data.actor._id)
        // Wallet.log(false, "Actor Data:", data)
    // VARIABLES
        const actorID = data.actor._id // Get this actor's ID
        const currency = data.data.currency
        // Wallet.log(false, "Actor Currency:", currency)
    // ADD TAB TO ROW OF TABS
        const tabName = game.i18n.localize('WALLET.tab-title') // Add the Tab Name localized
        const walletTabButton = $('<a class="item" data-tab="wallet">' + tabName + '</a>'); // Create the A element, which is the button that's placed in the row of other tab titles
        const tabs = html.find('.tabs[data-group="primary"]'); // Find the tabs
        tabs.append(walletTabButton); // Add the Wallet Tab to the tabs
    // ADD TAB CONTENT DIV
        const tabContent = html.find('.sheet-body') // Find the tab's body
        const walletTab = $(`
            <div class="tab wallet" data-group="primary" data-tab="wallet" id="wallet-content">
                <div id="wallet-header"></div>
                <div id="wallet-body"></div>
            </div>
        `) // Create the div to store our tab content
        tabContent.append(walletTab) // Append the div to the body
        const bodyDiv = document.getElementById('wallet-body') // Get the same div by ID to manipulate later
    // ADD BUTTONS
    
    // HEADER
        const headerDiv = document.getElementById('wallet-header') // Get the header div
        const currencyForm = document.createElement('form') // Create the new form
        currencyForm.id = 'currency-form' // Set its ID
        const denominations = ['pp', 'gp', 'ep', 'sp', 'cp'] // Declare a list of currencies to loop through
        denominations.forEach(element => { // Loop through the currencies 
            const span = document.createElement('span')
            span.id = element
            span.innerHTML = `
                <span id="${element}-parent">
                    <i id="${element}-icon" class='fas fa-coins ${element}-coin money'></i>
                    <input class="wallet-currency-input" style="width: auto; max-width: 60px" type="number" id="${element}-input" value="${currency[element]}" placeholder="0"/>
                </span>
                `
            headerDiv.appendChild(span)
            document.getElementById(`${element}-input`).addEventListener('keydown', function (keypress) {
                if (keypress.code === "Enter"){ // TODO: Create a new transaction and update denomination totals on Enter press
                    const note = document.getElementById('wallet-note-input').value // Get the Note
                    const pp = document.getElementById('pp-input').value // Get the pp
                    const gp = document.getElementById('gp-input').value // Get the gp
                    const ep = document.getElementById('ep-input').value // Get the ep
                    const sp = document.getElementById('sp-input').value // Get the sp
                    const cp = document.getElementById('cp-input').value // Get the cp
                }
            })
        })
        // Add the Note Field
        const noteSpan = document.createElement('span')
        noteSpan.id = 'wallet-note-span'
        const noteInput = document.createElement('input')
        noteInput.type = 'text'
        noteInput.id = 'wallet-note-input'
        noteInput.placeholder = 'Enter note...'
        noteInput.style.width = '100px'
        noteSpan.appendChild(noteInput)
        headerDiv.appendChild(noteSpan)
        document.getElementById('wallet-note-input').addEventListener('keydown', function (keypress) {
            if (keypress.code === "Enter"){ // TODO: Create a new transaction and update denomination totals on Enter press
                const note = document.getElementById('wallet-note-input').value // Get the Note
                const pp = document.getElementById('pp-input').value // Get the pp
                const gp = document.getElementById('gp-input').value // Get the gp
                const ep = document.getElementById('ep-input').value // Get the ep
                const sp = document.getElementById('sp-input').value // Get the sp
                const cp = document.getElementById('cp-input').value // Get the cp
            }
        })
        
    // APPEND TRANSACTIONS TO THE BODY
        const actorTransactions = WalletData.getTransactionsForActor(actorID) // Get all the transactions for this actor
        const actorTransArray = Object.values(actorTransactions) // Convert to an array to loop through
        Wallet.log(false, "Actor Transactions:", actorTransArray) // Log them for visibility
        const ul = document.createElement('ul') // Create un ordered list
        actorTransArray.forEach(element => { // Loop through each transaction
            const li = document.createElement('li') // Create a li element
            li.innerText = element.label // Add innerText
            li.value = element.id // Add Value
            li.id = `wallet-${element.id}` // Add ID
            ul.appendChild(li) // Append it to the unordered list
        });
        bodyDiv.appendChild(ul) // Append the unordered list to the div
})
// Register the module with Developer Mode
Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(Wallet.ID);
    // Use this to log things to console: Wallet.log(false, 'foo')
});
// Class to handle the data layer
class WalletData {
    // Method to get all transactions for a given token
    static get allTransactions() {
        const allTransactions = game.actors.reduce((accumulator, actor) => {
            const userTransactions = this.getTransactionsForActor(actor.id);
            return {
              ...accumulator,
              ...userTransactions
            }
        }, {});
        return allTransactions;
    }
    // Method to get all the transactiosn for a given user
    static getTransactionsForActor(actorID) {
        return game.actors.get(actorID)?.getFlag(Wallet.ID, Wallet.FLAGS.TRANSACTIONS)
    }
    // Create a new Transaction for a given user
    static createTransaction(actorID, tranData) {
        // Create the data object for the new transaction
        const transaction = {
            ...tranData, // Apply the data that's passed through
            id: foundry.utils.randomID(16), // Generate a random ID that is 16 characters long
            actorID // populate the Actor ID
        }
        // Construct the update to insert the new Transaction
        const transactions = {
            [transaction.id]: transaction
        }
        // Update the database with the new transaction
        return game.actors.get(actorID)?.setFlag(Wallet.ID, Wallet.FLAGS.TRANSACTIONS, transactions)        
    }
    // Update a specific Transaction by ID with the provided data
    static updateTransaction(tranID, updateData) {
        const relevantTransaction = this.allTransactions[tranID];

        // construct the update to send
        const update = {
            [tranID]: updateData
        }

        // update the database with the updated ToDo list
        return game.actors.get(relevantTransaction.actorID)?.setFlag(Wallet.ID, Wallet.FLAGS.TRANSACTIONS, update) 
    }
    // Delete a specific Transaction by ID
    static deleteTransaction(tranID) {
        const releventTransaction = this.allTransactions[tranID];

        // Foundry specific syntax required to delete a key from a persisted object in the database
        const keyDeletion = {
          [`-=${tranID}`]: null
        }
    
        // update the database with the updated ToDo list
        return game.actors.get(releventTransaction.actorID)?.setFlag(Wallet.ID, Wallet.FLAGS.TRANSACTIONS, keyDeletion)
    }
    // Update transactions in bulk
    static updateTransactions(actorID, updateData) {
        return game.actors.get(actorID)?.setFlag(Wallet.ID, Wallet.FLAGS.TRANSACTIONS, updateData)
    }
}
Wallet.log(false, "Loaded Successfully!")