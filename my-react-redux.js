import { createContext, useState, useEffect, useContext } from "react";

const StoreContext = createContext();

export function Provider({ children, store }) {
  const [state, setState] = useState(store.getState());
  useEffect(() => {}, []);
  store.subscribe(() => {
    setState(store.getState());
  }, []);
  return (
    <StoreContext.Provider value={{ state, dispatch: store.dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useDispatch = () => {
  const store = useContext(StoreContext);
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useContext(StoreContext);
  return selector(store.state);
};
