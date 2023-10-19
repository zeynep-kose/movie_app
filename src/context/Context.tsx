import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type MyContextType = {
  filterIds: number[];
  setFilterIds: Dispatch<SetStateAction<number[]>>;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [filterIds, setFilterIds] = useState<number[]>([]);
  // const [checkboxStates, setCheckboxStates] = useState({});
  // const updateCheckboxState = (id: number, checked: boolean) => {
  //   setCheckboxStates((prev) => ({ ...prev, [id]: checked }));
  // };

  return (
    <MyContext.Provider
      value={{ filterIds: filterIds, setFilterIds: setFilterIds }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyContext;
