// Function to update currencies
function updateCurrency(id){
    // Pull the currency from the id
    const currencyName = id.replace('_display', '')
    // FIRESTORE PULL
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let getDoc = init.getDoc
            let doc = init.doc
            let auth = init.auth
            let onAuthStateChanged = init.onAuthStateChanged
            let updateDoc = init.updateDoc
    // Work with the FireStore Database
        onAuthStateChanged(auth, (user) => { // Check if User is logged in
            if (user){
                const characterName = localStorage.getItem('selectedCharacter') // Get the Selected Campaign from LocalStorage
                const docRef = doc(db, "characters", user.uid, characterName, 'settings') // Get just the doc for the current user
                getDoc(docRef).then((snapshot) => {
                    // GET DATA
                        const currency = snapshot.data().currency // Get the character's health data
                    // VARIABLES
                        let currencyValue = parseInt(currency[currencyName]) // Copper from Firestore
                    // UPDATE THE DOM
                        document.getElementById(id).innerHTML = ` ${currencyValue.toLocaleString()}`
                }).catch(error => { console.log(error) }) // getDoc Errors
            }
        })
    }).catch(error => { console.log(error) }) // Auth Errors
}
// Function to calculate the total of a specified currency
function totalCurrency(id){
    // Pull the currency from the id
    let currencyName = id.replace('Total', '')
    // FIRESTORE PULL
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let getDoc = init.getDoc
            let doc = init.doc
            let auth = init.auth
            let onAuthStateChanged = init.onAuthStateChanged
            let updateDoc = init.updateDoc
    // Work with the FireStore Database
        onAuthStateChanged(auth, (user) => { // Check if User is logged in
            if (user){
                const characterName = localStorage.getItem('selectedCharacter') // Get the Selected Campaign from LocalStorage
                const docRef = doc(db, "characters", user.uid, characterName, 'settings') // Get just the doc for the current user
                getDoc(docRef).then((snapshot) => {
                    // GET DATA
                        const currency = snapshot.data().currency // Get the character's health data
                    // VARIABLES
                        let copper = parseInt(currency.copper) // Copper from Firestore
                        let silver = parseInt(currency.silver) // Silver from Firestore
                        let electrum = parseInt(currency.electrum) // Electrum from Firestore
                        let gold = parseInt(currency.gold) // Gold from Firestore
                        let platinum = parseInt(currency.platinum) // Platinum from Firestore
                    // COMPUTE
                        // Handle the multiplication
                        switch(currencyName){
                            case 'copper':
                                // Convert each currency into copper
                                copper = copper * 1
                                silver = silver * 10
                                electrum = electrum * 50
                                gold = gold * 100
                                platinum = platinum * 1000
                                var sum = copper + silver + electrum + gold + platinum
                                break
                            case 'silver':
                                // Convert each currency into silver
                                copper = copper * 0.1
                                silver = silver * 1
                                electrum = electrum * 5
                                gold = gold * 10
                                platinum = platinum * 100
                                var sum = copper + silver + electrum + gold + platinum
                                break
                            case 'electrum':
                                // Convert each currency into electrum
                                copper = copper / 50
                                silver = silver * 0.2
                                electrum = electrum * 1
                                gold = gold * 2
                                platinum = platinum * 20
                                var sum = copper + silver + electrum + gold + platinum
                                break
                            case 'gold':
                                // Covnert each currency into gold
                                copper = copper / 100
                                silver = silver * 0.1
                                electrum = electrum * 0.5
                                gold = gold * 1
                                platinum = platinum * 10
                                var sum = copper + silver + electrum + gold + platinum
                                break
                            case 'platinum':
                                // Convert each currency into platinum
                                copper = copper / 1000
                                silver = silver / 100
                                electrum = electrum / 20
                                gold = gold / 10
                                platinum = platinum * 1
                                var sum = copper + silver + electrum + gold + platinum
                                break
                        
                        }
                        // Update the displayed text
                        document.getElementById(id).innerHTML = ` (${sum.toLocaleString()})`
                }).catch(error => { console.log(error) }) // getDoc Errors
            }
        })
    }).catch(error => { console.log(error) }) // Auth Errors
}
// Function to save currency
function saveCurrency(){
    // USER INPUTS
        let copper = parseFloat(document.getElementById('cpInput').value) // Copper Value
        if (!copper) { copper = 0 } // If copper is null set it to 0
        let silver = parseFloat(document.getElementById('spInput').value) // Silver Value
        if (!silver) { silver = 0 } // If silver is null set it to 0
        let electrum = parseFloat(document.getElementById('epInput').value) // Electrum Value
        if (!electrum) { electrum = 0 } // If electrum is null set it to 0
        let gold = parseFloat(document.getElementById('gpInput').value) // Gold Value
        if (!gold) { gold = 0 } // If gold is null set it to 0
        let platinum = parseFloat(document.getElementById('ppInput').value) // Platinum Value
        if (!platinum) { platinum = 0 } // If platinum is null set it to 0
        // Check if any have decimals
            let copperDec = (copper - Math.floor(copper))
            let silverDec = (silver - Math.floor(silver))
            let electrumDec = (electrum - Math.floor(electrum))
            let goldDec = (gold - Math.floor(gold))
            let platDec = (platinum - Math.floor(platinum))
            // If contain decimals
                if (copperDec != 0 || silverDec != 0 || electrumDec != 0 || goldDec != 0 || platDec != 0){
                    alert(`This tool doesn't currently support decimals. I'm sorry :(`)
                    return
                }
        // If all inputs blank
            if (!copper && !silver && !electrum && !gold && !platinum){
                alert("Please input a number!")
                return
            }
    // FIRESTORE PULL
    import('/src/pages/profile/firebaseInit.js').then((init)=> { 
        // IMPORTS
            let db = init.db
            let getDoc = init.getDoc
            let doc = init.doc
            let auth = init.auth
            let onAuthStateChanged = init.onAuthStateChanged
            let updateDoc = init.updateDoc
    // Work with the FireStore Database
        onAuthStateChanged(auth, (user) => { // Check if User is logged in
            if (user){
                const characteName = localStorage.getItem('selectedCharacter') // Get the Selected Campaign from LocalStorage
                const docRef = doc(db, "characters", user.uid, characteName, 'settings') // Get just the doc for the current user
                getDoc(docRef).then((snapshot) => {
                    // GET DATA
                        const currency = snapshot.data().currency // Get the character's health data
                    // VARIABLES
                        let copperLocal = parseInt(currency.copper) // Copper from Firestore
                        let silverLocal = parseInt(currency.silver) // Silver from Firestore
                        let electrumLocal = parseInt(currency.electrum) // Electrum from Firestore
                        let goldLocal = parseInt(currency.gold) // Gold from Firestore
                        let platinumLocal = parseInt(currency.platinum) // Platinum from Firestore
                    // UPDATE DATA
                        currency.copper = copperLocal + copper // Update copper
                        currency.silver = silverLocal + silver // Update silver
                        currency.electrum = electrumLocal + electrum // Update electrum
                        currency.gold = goldLocal + gold // Update gold
                        currency.platinum = platinumLocal + platinum // Update platinum
                    // UPDATE FIRESTORE
                        updateDoc(docRef, {
                            currency: currency                                    
                        })
                    // UPDATE DOM
                        document.getElementById('cpInput').value = '' // Reset Copper
                        document.getElementById('spInput').value = '' // Reset Silver
                        document.getElementById('epInput').value = '' // Reset Electrum
                        document.getElementById('gpInput').value = '' // Reset Gold
                        document.getElementById('ppInput').value = '' // Reset Platinum
                    // UPDATE CURRENCY
                        updateCurrency('copper_display')
                        updateCurrency('silver_display')
                        updateCurrency('electrum_display')
                        updateCurrency('gold_display')
                        updateCurrency('platinum_display')
                        totalCurrency('copperTotal')
                        totalCurrency('silverTotal')
                        totalCurrency('electrumTotal')
                        totalCurrency('goldTotal')
                        totalCurrency('platinumTotal')
                }).catch(error => { console.log(error) }) // getDoc Errors
            }
        })
    }).catch(error => { console.log(error) }) // Auth Errors
}
// Function to append a currency transaction to the database
function currencyTransaction(type){
    // USER INPUTS
        let copper = parseFloat(document.getElementById('cpInput').value) // Copper Value
        if (!copper) { copper = 0 } // If copper is null set it to 0
        let silver = parseFloat(document.getElementById('spInput').value) // Silver Value
        if (!silver) { silver = 0 } // If silver is null set it to 0
        let electrum = parseFloat(document.getElementById('epInput').value) // Electrum Value
        if (!electrum) { electrum = 0 } // If electrum is null set it to 0
        let gold = parseFloat(document.getElementById('gpInput').value) // Gold Value
        if (!gold) { gold = 0 } // If gold is null set it to 0
        let platinum = parseFloat(document.getElementById('ppInput').value) // Platinum Value
        if (!platinum) { platinum = 0 } // If platinum is null set it to 0
        let note = document.getElementById('moneyNote').value // Note Values
        if (!note) { note = 'No note.' } // If note is null set it to 'No note.'
        // Check if any have decimals
            let copperDec = (copper - Math.floor(copper))
            let silverDec = (silver - Math.floor(silver))
            let electrumDec = (electrum - Math.floor(electrum))
            let goldDec = (gold - Math.floor(gold))
            let platDec = (platinum - Math.floor(platinum))
            // If contain decimals
                if (copperDec != 0 || silverDec != 0 || electrumDec != 0 || goldDec != 0 || platDec != 0){
                    alert(`This tool doesn't currently support decimals. I'm sorry :(`)
                    return
                }
        var date = new Date(); // Instantiate a new date object
        const today = date.toLocaleDateString() // Get today's date
    // FIRESTORE PULL
        import('/src/pages/profile/firebaseInit.js').then((init)=> { 
            // IMPORTS
                let db = init.db
                let getDoc = init.getDoc
                let doc = init.doc
                let auth = init.auth
                let onAuthStateChanged = init.onAuthStateChanged
                let updateDoc = init.updateDoc
                let addDoc = init.addDoc
                let collection = init.collection
        // Work with the FireStore Database
            onAuthStateChanged(auth, (user) => { // Check if User is logged in
                if (user){
                    const characterName = localStorage.getItem('selectedCharacter')
                    const docRef = doc(db, "characters", user.uid, characterName, 'settings') // Get just the doc for the current user
                    getDoc(docRef).then((snapshot) => {
                        // GET DATA
                            const currency = snapshot.data().currency
                        // VARIABLES #1
                            let copperLocal = parseInt(currency.copper) // Copper from Firestore
                            let silverLocal = parseInt(currency.silver) // Silver from Firestore
                            let electrumLocal = parseInt(currency.electrum) // Electrum from Firestore
                            let goldLocal = parseInt(currency.gold) // Gold from Firestore
                            let platinumLocal = parseInt(currency.platinum) // Platinum from Firestore
                        // COMPUTE
                            if (type == 'buy'){
                                // *************************
                                //   NON-SUFFICIENT FUNDS
                                // *************************
                                    let copperGold1 = copper / 100 // Conver copper to gold
                                    let silverGold1 = silver / 10 // Conver silver to gold
                                    let electrumGold1 = electrum / 2 // Conver electrum to gold
                                    let goldGold1 = gold * 1 // Conver gold to gold
                                    let platinumGold1 = platinum * 10 // Conver platinum to gold
                                    let sumGold = copperGold1 + silverGold1 + electrumGold1 + goldGold1 + platinumGold1 // Sum the gold converts
                                    let goldTotal = parseFloat(document.getElementById('goldTotal').innerHTML.replace("(", "").replace(")", "")) // Get the Gold Total from user inputs
                                    // If Non-sufficient Funds dispaly a modal
                                    if (Math.abs(sumGold) > goldTotal) {
                                        alert(`Non-sufficient Funds: Can you really make a purchase that costs ${Math.abs(sumGold).toLocaleString()} gp while only having ${goldTotal.toLocaleString()} gp? Cheeky 😉 Hint: the values in parentheses for each denomination represent the total you have for that denomination if all your money were converted to that respective denomination.`)
                                        // CLEAR TEXT BOXES
                                            document.getElementById('cpInput').value = '' // copper
                                            document.getElementById('spInput').value = '' // silver
                                            document.getElementById('epInput').value = '' // electrum
                                            document.getElementById('gpInput').value = '' // gold
                                            document.getElementById('ppInput').value = '' // platinum
                                            document.getElementById('moneyNote').value = '' // note
                                        return // Stop the function since character does not have enough funds
                                    }
                                // ************************************
                                //     THE PURCHASE ALGO (VERSON 6)
                                // ************************************
                                    const denominations = ['platinum', 'gold', 'electrum', 'silver', 'copper'] // Set up the denominations list
                                    const multipliers = {"platinum": 1000, "gold": 100, "electrum":50, "silver":10, "copper":1} // Set up the multipliers table
                                    // When this applies: if the user wants to spend 14 gp, but only has 12 gp, and, in total, has 22 gp, then convert the remainder from remaining denominations
                                    if (copper > copperLocal || silver > silverLocal || electrum > electrumLocal || gold > goldLocal || platinum > platinumLocal){
                                        let cpCopper = copper * 1 // Convert copper to copper
                                        let spCopper = silver * 10 // Convert silver to copper
                                        let epCopper = electrum * 50 // Convert electrum to copper
                                        let gpCopper = gold * 100 // Convert gold to copper
                                        let ppCopper = platinum * 1000 // Convert platinum to copper
                                        let sumCopper = cpCopper + spCopper + epCopper + gpCopper + ppCopper // Sum all the copper converts
                                        // Loop through each denomination
                                        for (let index = 0; index < denominations.length; index++) { // Loop until sumCopper = 0
                                            const element = denominations[index] // Set up an easily referancable element
                                            const multiplier = multipliers[element] // Get the multiplier from the multipliers table
                                            // PRELIM CALCULATIONS
                                                const walletTotal = currency[element] // See how much they have in their wallet for the current denomination
                                                let convertedDenom = sumCopper / multiplier // Convert copper to current denomination
                                                if (convertedDenom < 1) continue // Continue if the conversion is not at least 1
                                            // ADJUSTMENTS
                                                convertedDenom = Math.floor(convertedDenom) // Floor the convertedDenom
                                                const walletFinal = currency[element] - convertedDenom // Determine how much of this denomination the PC will have
                                                // Only capture if there are leftover coins
                                                if(walletFinal >= 0) {
                                                    currency[element] = walletFinal // Update the Currency JSON
                                                    const backToCopper = convertedDenom * multiplier // Convert this denomination back to copper
                                                    sumCopper -= backToCopper // Adjust sumCopper
                                                    continue // Move to the next currency
                                                }
                                            // ADJUSTMENT (IF REMAINDER)
                                                // Only capture if the user has coins of the current denomination 
                                                if(walletTotal != 0){
                                                    const remainder = convertedDenom - walletTotal // Remainder
                                                    currency[element] = 0 // Update the Currency JSON to 0 b/c it was just all spent
                                                    sumCopper -= walletTotal * multiplier // Convert walletTotal back to copper and subtract it from sumCopper b/c it was all used
                                                }
                                        }
                                    } else {
                                        currency.copper = copperLocal - copper // Update copper
                                        currency.silver = silverLocal - silver // Update silver
                                        currency.electrum = electrumLocal - electrum // Update electrum
                                        currency.gold = goldLocal - gold // Update gold
                                        currency.platinum = platinumLocal - platinum // Update platinum
                                    }
                            }
                        // VARIABLES #2
                            // The object that will get appended to Currency Transactions
                            let transactionArray = {"type": type, 
                                                    "copper": copper, 
                                                    "silver": silver,
                                                    "electrum": electrum,
                                                    "gold": gold, 
                                                    "platinum": platinum, 
                                                    "note": note,
                                                    "date": today}
                        // UPDATE DATA
                            if (type === 'sell'){
                                currency.copper = copperLocal + copper // Update copper
                                currency.silver = silverLocal + silver // Update silver
                                currency.electrum = electrumLocal + electrum // Update electrum
                                currency.gold = goldLocal + gold // Update gold
                                currency.platinum = platinumLocal + platinum // Update platinum
                            } 
                        // SET THE DATA
                            addDoc(collection(db, `characters`, user.uid, characterName, `currency`, 'currency_history'), transactionArray)
                        // UPDATE FIRESTORE
                            updateDoc(docRef, {
                                currency: currency                                     
                            })
                        // UPDATE DOM
                            document.getElementById('cpInput').value = '' // Reset Copper
                            document.getElementById('spInput').value = '' // Reset Silver
                            document.getElementById('epInput').value = '' // Reset Electrum
                            document.getElementById('gpInput').value = '' // Reset Gold
                            document.getElementById('ppInput').value = '' // Reset Platinum
                            document.getElementById('moneyNote').value = '' // Reset Note
                        // UPDATE CURRENCY
                            updateCurrency('copper_display')
                            updateCurrency('silver_display')
                            updateCurrency('electrum_display')
                            updateCurrency('gold_display')
                            updateCurrency('platinum_display')
                        // UPDATE TOTALS
                            totalCurrency('copperTotal')
                            totalCurrency('silverTotal')
                            totalCurrency('electrumTotal')
                            totalCurrency('goldTotal')
                            totalCurrency('platinumTotal')
                    }).catch(error => { console.log(error) }) // getDoc Errors
                }
            })
        }).catch(error => { console.log(error) }) // Auth Errors     
}