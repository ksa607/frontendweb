import React, {useContext, useState, useEffect} from 'react';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { TransactionsContext } from '../contexts/TransactionProvider';

function Transaction({
	id,
	date,
	amount,
	user,
	place
}) {
	const { setTransactionToUpdate, deleteTransaction } = useContext(TransactionsContext);
    const handleUpdate = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            setTransactionToUpdate(id);
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

export default function Transactions({searchTerm}) {
    const { transactions, error, loading } = useContext(TransactionsContext);
	const [filteredTransactions, setFilteredTransactions]=useState();

	useEffect(() => {
		if (!transactions) return;
		setFilteredTransactions(transactions.filter((t) => {
		  return t.place.name.toLowerCase().includes(searchTerm.toLowerCase());
		}))}, [transactions, searchTerm])

	if (loading) return (<h1>Loading...</h1>);
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (!filteredTransactions) return null;

    return (
		<table className="table-fixed m-auto">
			<tbody>
				{filteredTransactions.map((trans, i) => {
					return (
						<MemoizedTransaction
							key={i}
							{...trans}
						/>
					);
				})}
			</tbody>
		</table>
	);
    }