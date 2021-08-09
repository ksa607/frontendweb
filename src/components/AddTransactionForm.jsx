
import { useState , useEffect} from 'react';

export default function AddTransactionForm({places, onSaveTransaction }) {

  const [user, setUser] = useState('');
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('');
  const [amount, setAmount] = useState(0);

 console.log(onSaveTransaction);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("saving");
    onSaveTransaction(user, place, amount, date);
    console.log("saving after");
    setUser('');
    setDate(new Date());
    setPlace('');
    setAmount(0);
  };


  
  const toDateInputString = (date) => {
    // (toISOString returns something like 2020-12-05T14:15:74Z,
    // date HTML5 input elements expect 2020-12-05
    //
    if (!date) return null;
    if (typeof date !== Object) {
      date = new Date(date);
    }
    let asString = date.toISOString();
    return asString.substring(0, asString.indexOf('T'));
  };

  return (
    <form onSubmit={handleSubmit} className="m-5">
       <div className="grid grid-cols-6 gap-6">
         <div className="col-span-6 sm:col-span-3">
           <label htmlFor="user">user</label>
           <input
           value={user}
           onChange={(e) => setUser(e.target.value)}
             type="text"
             placeholder="user"
             name="user" id="user"
             required
           />
         </div>
         <div className='col-span-6 sm:col-span-3'>
           <label htmlFor='date'>date</label>
           <input
           value={toDateInputString(date)}
           onChange={(e) => setDate(e.target.value)}
             type='date'
             placeholder='date'
             name='date' id='date'
           />
         </div>
         <div className="col-span-6 sm:col-span-3">
           <label htmlFor="place">place</label>
           <select
             value={place}
             onChange={(e) => setPlace(e.target.value)}
             name="place" id="place"
             required
           >
             {places.map((p, index) => (
               <option key={index} value={p.name}>
                 {p.name}
               </option>
             ))}
           </select>
         </div>
         <div className="col-span-6 sm:col-span-3">
           <label htmlFor="amount">amount</label>
           <input                           
             value={amount}
             onChange={(e) => setAmount(e.target.value)}
               type="number"
               placeholder="amount"
               name="amount" id="amount"
               required
             />
         </div>
         <div className="col-span-6 sm:col-span-3">
             <div className="flex justify-end">
               <button type="submit">Save</button>
             </div>
           </div>
         </div>
     </form>
   )
 }