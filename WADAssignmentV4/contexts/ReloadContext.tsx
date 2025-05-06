import React, { createContext, useState, useContext, ReactNode } from 'react';

type ReloadRecord = {
  amount: number;
  timestamp: string;
};

type ReloadContextType = {
  balance: number;
  history: ReloadRecord[];
  addRecord: (amount: number) => void;
};

const ReloadContext = createContext<ReloadContextType | undefined>(undefined);

export const ReloadProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<ReloadRecord[]>([]);

  const addRecord = (amount: number) => {
    const now = new Date();
    setHistory((prev) => [
      { amount, timestamp: now.toLocaleString() },
      ...prev,
    ]);
    setBalance((prev) => prev + amount);
  };

  return (
    <ReloadContext.Provider value={{ balance, history, addRecord }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  const context = useContext(ReloadContext);
  if (!context) throw new Error('useReload must be used within ReloadProvider');
  return context;
};

