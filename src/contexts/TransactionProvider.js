import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config.json';

export const TransactionsContext = createContext();

export const TransactionsProvider = (props) => {
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const refreshTransactions = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const { data } = await axios.get(
        `${config.base_url}transactions?limit=25&offset=0`
      );
      setTransactions(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (transactions?.length === 0) {
      refreshTransactions();
    }
  }, [transactions, refreshTransactions]);

  const createOrUpdateTransaction = async ({ id, placeId, amount, date }) => {
    setError();
    let data = { placeId, amount, date };
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}transactions/${id ?? ''}`;

    try {
      const { changedTransaction } = await axios({
        method,
        url,
        data,
      });
      await refreshTransactions();
      return changedTransaction;
    } catch (error) {
      setError(error);
    }
  };

  const deleteTransaction = async ({ id }) => {
    try {
      setError();
      const { data } = await axios({
        method: 'delete',
        url: `${config.base_url}transactions/${id}`,
      });
      refreshTransactions();
      return data;
    } catch (error) {
      setError(error);
    }
  };

  const setTransactionToUpdate = (id) => {
    setCurrentTransaction(
      id === null ? {} : transactions.find((t) => t.id === id)
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        // currentTransaction is the one being shown in the form
        currentTransaction,
        error,
        loading,
        setTransactionToUpdate,
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
