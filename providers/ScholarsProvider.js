import { createContext, useState } from "react";

//create a context, with createContext api
export const scholarsContext = createContext();

const ScholarsProvider = (props) => {
  // this state will be shared with all components
  const [scholars, setScholars] = useState();
  const [loading, setLoading] = useState(false);

  return (
    // this is the provider providing state
    <scholarsContext.Provider
      value={[scholars, setScholars, loading, setLoading]}
    >
      {props.children}
    </scholarsContext.Provider>
  );
};

export default ScholarsProvider;
