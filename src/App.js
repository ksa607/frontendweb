import './App.css';
import React, {useState} from "react";
import Transaction from './components/Transaction';
import AddTransactionForm from './components/AddTransactionForm';
import Places from './components/Places';
import {TRANSACTION_DATA, PLACE_DATA} from './mock-data';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);

  const ratePlace = (id, rating) => {
    console.log("ratin")
    const newPlaces=places.map(p=> p.id===id? {...p, rating}:p);
    setPlaces(newPlaces)
  }

  const createTransaction = (user, place, amount, date) => {
    console.log("create transaction");
    const newTransactions = [
      {
        id: transactions.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1,
        user, place, amount, date:new Date(date)
      },
      ...transactions,
    ]; // newest first
    setTransactions(newTransactions);
    console.log(JSON.stringify(newTransactions));   
    console.log(JSON.stringify(transactions));    
  };

  /*
    useEffect(() => {
      transactions.filter((t) => {
    console.log("filtering...")
    return t.place.toLowerCase().includes(search.toLowerCase())}), [transactions]})
    */

 console.log("render App")
  return (
    <div className="App">
     <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      {transactions.map((trans, index) => 
        <Transaction {...trans} key={index}/>)}
      <Places places={places} onRate={ratePlace}/>
    </div>
  );
}

export default App;
