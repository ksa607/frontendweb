import React, {useContext} from 'react';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { TransactionsContext } from '../contexts/TransactionProvider';

function Transaction({
	id,
	date,
	amount,
	user,
	place, 	
    updateTransaction,
	deleteTransaction,}) {

    const handleUpdate = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            updateTransaction({ id, user, place, amount, date });
        };
    
    const handleRemove = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            deleteTransaction({ id });
        };
	return (
		<tr>
			<td className="border w-1/4 px-4 py-2">{new Date(date).toLocaleDateString()}</td>
			<td className="border w-1/4 px-4 py-2">{user.firstName} {user.lastName}</td>
			<td className="border w-1/4 px-4 py-2">{place.name}</td>
			<td className="border w-1/4 px-4 py-2 text-left">{amount} &euro;</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoPencil  onClick={handleUpdate}  />
				</button>
			</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoTrashOutline  onClick={handleRemove} />
				</button>
			</td>
			{/* on {date} {user} {amount > 0 ? 'received' : 'spent'} {amount} {amount > 0 ? '' : 'at'} {place} */}
		</tr>
	);
}

const MemoizedTransaction =  React.memo(Transaction);

export default function Transactions() {
    const { transactions, deleteTransaction, setCurrentTransaction } = useContext(TransactionsContext);
    return (
		<table className="table-fixed m-auto">
			<tbody>
				{transactions.map((trans, i) => {
					return (
						<MemoizedTransaction
							key={i}
							{...trans}
                            updateTransaction={setCurrentTransaction}
							deleteTransaction={deleteTransaction}
						/>
					);
				})}
			</tbody>
		</table>
	);
    }