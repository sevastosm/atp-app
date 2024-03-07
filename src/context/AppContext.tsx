import { useState, createContext } from 'react';
type AppContext = {
  selectedRow: any;
  setSelectedRow: any;
  users: any;
  nutritions: any;
};

// import { users } from 'src/mocks/users';

export const AppContext = createContext<any>({});

export const AppContextProvider: any = ({ children }) => {
  const [customers, setUsers] = useState(null);
  const [products, setProducts] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);
  const [nutritions, setNutritions] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [auth, setAuth] = useState(false);
  const [logedInUser, setLogedInUser] = useState(null);

  console.log('logedInUser-APP', logedInUser);
  console.log('selectedRow-APP', selectedRow);

  return (
    <AppContext.Provider
      value={{
        logedInUser,
        setLogedInUser,
        selectedRow,
        setSelectedRow,
        customers,
        nutritions,
        activeUser,
        setActiveUser,
        setUsers,
        message,
        setMessage,
        auth,
        setAuth,
        products,
        setProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
