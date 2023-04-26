import { FC, useState, createContext } from 'react';
type AppContext = {
  selectedRow: any;
  setSelectedRow: any;
  users: any;
  nutritions: any;
};

// import { users } from 'src/mocks/users';

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppContext = createContext<any>({});

export const AppContextProvider: FC = ({ children }) => {
  const [customers, setUsers] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [nutritions, setNutritions] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedRow,
        setSelectedRow,
        customers,
        nutritions,
        activeUser,
        setActiveUser,
        setUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
