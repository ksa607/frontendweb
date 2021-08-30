import React, {
  useState,
} from "react";
import Transactions from './components/Transactions';
import AddTransactionForm from './components/AddTransactionForm';
import Places from './components/Places';
import { TransactionsProvider } from './contexts/TransactionProvider';
import { PlacesProvider } from './contexts/PlacesProvider';


function App() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  return (   

      <PlacesProvider>
        <TransactionsProvider>
          <AddTransactionForm />
          <div className="m-5 flex">
          <input type="search" value={text} onChange={(e) => setText(e.target.value)} className="flex-1" placeholder="search" />
            <button type="button" onClick={()=>setSearch(text)}>Search</button>
          </div>
          <Transactions searchTerm={search}/>
        </TransactionsProvider>
        <Places/>
      </PlacesProvider>
   
  );
}

export default App;