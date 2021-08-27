import { useState } from 'react';

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

export function App() {
  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen,
  ] = useState<boolean>(false);

  function handleToggleNewTransactionModal() {
    setIsNewTransactionModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleToggleNewTransactionModal} />
        <Dashboard />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleToggleNewTransactionModal}
        />
      </TransactionsProvider>

      <GlobalStyle />
    </>
  );
}
