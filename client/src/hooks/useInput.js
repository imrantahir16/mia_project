import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const resetUser = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, resetUser, attributeObj];
};

export default useInput;
