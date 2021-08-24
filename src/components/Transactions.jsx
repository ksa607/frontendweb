import React from 'react';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';

function Transaction({
	id,
	date,
	amount,
	user,
	place}) {
	
	return (
		<tr>
			<td className="border w-1/4 px-4 py-2">{new Date(date).toLocaleDateString()}</td>
			<td className="border w-1/4 px-4 py-2">{user.firstName} {user.lastName}</td>
			<td className="border w-1/4 px-4 py-2">{place.name}</td>
			<td className="border w-1/4 px-4 py-2">{amount} &euro;</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoPencil  />
				</button>
			</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoTrashOutline />
				</button>
			</td>
			{/* on {date} {user} {amount > 0 ? 'received' : 'spent'} {amount} {amount > 0 ? '' : 'at'} {place} */}
		</tr>
	);
}

const MemoizedTransaction =  React.memo(Transaction);

export default function Transactions({
    transactions
}) {
    return (
		<table className="table-fixed m-auto">
			<tbody>
				{transactions.map((trans, i) => {
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