import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config.json';

export const TransactionsContext = createContext();

export const TransactionsProvider = (props) => {
	const [currentTransaction, setCurrentTransaction] = useState({});
	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false); //error state of throw error

	const refreshTransactions = useCallback(async () => {
		try {
			setError();
			setLoading(true);
			const { data } = await axios.get(
				`${config.base_url}transactions?limit=25&offset=0`
			);
			setTransactions(data.data);
			setLoading(false);
			return data.data;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	}, []);

	useEffect(() => {
		if (transactions?.length === 0) {
			refreshTransactions();
		}
	}, [refreshTransactions, transactions]);

	const createOrUpdateTransaction = async ({
		id,
		userId,
		placeId,
		amount,
		date,
	}) => {
		let data = { userId, placeId, amount, date };
		let method = 'post';
		try {
			if (id) {
				data = { ...data, id };
				method = 'put';
			}
			const { changedTransaction } = await axios({
				method,
				url: `${config.base_url}transactions`,
				data,
			});
			await refreshTransactions();
			return changedTransaction;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const deleteTransaction = async ({ id }) => {
		try {
			const { data } = await axios({
				method: 'delete',
				url: `${config.base_url}transactions/${id}`,
			});
			refreshTransactions();
			return data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return (
		<TransactionsContext.Provider
			value={{
				// currentTransaction is the one being shown in the form
				currentTransaction,
				setCurrentTransaction,
				// state pertaining all transactions
				transactions, // access to transactions
				deleteTransaction, // delete one
				createOrUpdateTransaction, // create or update one (if id is set: update)
				// we don't expose the setTransactions / refreshTransactions / ... these should happen
				// transparently because of delete / ... actions
			}}
		>
			{props.children}
		</TransactionsContext.Provider>
	);
};
