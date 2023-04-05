import { FC, useState, createContext } from 'react';
type AppContext = {
  selectedRow: any;
  setSelectedRow: any;
  users: any;
  nutritions: any;
};

import { users } from 'src/mocks/users';

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppContext = createContext<any>({});

export const AppContextProvider: FC = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState(users[0]);
  const [customers, setUsers] = useState(users);
  const [nutritions, setNutritions] = useState(null);
  const [activeUser, setActiveUser] = useState(users[0]);

  return (
    <AppContext.Provider
      value={{ selectedRow, setSelectedRow, customers, nutritions, activeUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
