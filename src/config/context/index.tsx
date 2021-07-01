import React, {useState} from 'react';
import {View, Text} from 'react-native';

type actionType = {
  setHeight: (number: number) => void;
  setWeight: (number: number) => void;
};

type stateType = {height: number; weight: number};

const MeasureBodyContext = React.createContext<
  {state: stateType; action: actionType} | undefined
>(undefined);

const index: React.FC = ({children}) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const state = {height, weight};
  const action = {setHeight, setWeight};

  const value = {state, action};

  return (
    <MeasureBodyContext.Provider value={value}>
      {children}
    </MeasureBodyContext.Provider>
  );
};

export function useMeasureBody() {
  const context = React.useContext(MeasureBodyContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export default index;
