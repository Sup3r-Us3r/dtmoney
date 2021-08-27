import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface ITransaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;
// type ITransactionInput = Pick<ITransaction, 'title' | 'type' | 'amount' | 'category'>;

interface ITransactionsContextData {
  transactions: ITransaction[],
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

interface ITransactionProviderProps {
  children: React.ReactNode
}

const TransactionsContext = createContext({} as ITransactionsContextData);

export const TransactionsProvider = ({ children }: ITransactionProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: ITransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions((prevState) => [...prevState, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
