import './App.css';
import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import {useFetch} from './hooks/useFetch';
import Transactions from './components/Transactions';
import AddTransactionForm from './components/AddTransactionForm';
import Places from './components/Places';
import {
  PLACE_DATA
} from './mock-data';


function App() {
  const [places, setPlaces] = useState(PLACE_DATA);

  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const {loading, data:transactions, error} = useFetch('http://localhost:9000/api/transactions?limit=100&offset=0' );
  const [filteredTransactions, setFilteredTransactions]=useState();
  
  const ratePlace = useCallback((id, rating) => {
    const newPlaces = places.map(p => p.id === id ? {
      ...p,
      rating
    } : p);
    setPlaces(newPlaces)
  }, [places])

  const createTransaction = (user, place, amount, date) => {
    console.log("create transaction");
    const newTransactions = [{
        id: transactions.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1,
        user,
        place,
        amount,
        date: new Date(date)
      },
      ...transactions,
    ]; // newest first
    //setTransactions(newTransactions);
    console.log("newtransactions", JSON.stringify(newTransactions));
    console.log("transactions", JSON.stringify(transactions));
  };

  /*
  const filteredTransactions = useMemo(() => transactions.filter((t) => {
    return t.place.name.toLowerCase().includes(search.toLowerCase());
  }), [transactions, search])

*/
useEffect(() => {
if (!transactions) return;
setFilteredTransactions(transactions.filter((t) => {
  return t.place.name.toLowerCase().includes(search.toLowerCase());
}))}, [transactions, search])

 /*
    useEffect(() => {
      transactions.filter((t) => {
    console.log("filtering...")
    return t.place.toLowerCase().includes(search.toLowerCase())}), [transactions]})
    */

    if (loading) return <h1>Loading...</h1>;
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (!transactions) return null;
  console.log("render App")
  return (   
      <div className="App">
        <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
        <div className="m-5 flex">
         <input type="search" value={text} onChange={(e) => setText(e.target.value)} className="flex-1" placeholder="search" />
          <button type="button" onClick={()=>setSearch(text)}>Search</button>
        </div>
        <Transactions transactions={filteredTransactions}/>
        <Places places={places} onRate={ratePlace}/>
      </div>
  );
}

export default App;