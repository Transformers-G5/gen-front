import React, { createContext, useState } from "react";

interface CurrentWorkT {
  uid: string;
  body: string;
  title: string;
}

interface MyContextProps {
  workData : CurrentWorkT | null;
  setWorkData: (object: CurrentWorkT | null) => void;
}

export const DataContext = createContext<MyContextProps>({
  workData : null,
  setWorkData: () => {},
});

export const DataProvider = (props: any) => {
  const [workData, setWorkData] = useState<CurrentWorkT | null>(null);

  return (
    <DataContext.Provider
      children={props.children}
      value={{ workData, setWorkData }}
    />
  );
};