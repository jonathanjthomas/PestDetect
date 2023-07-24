import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        if (typeof value === "object") {
            value = JSON.stringify(value)
        }
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
};

export const getData = async (key) => {
    try {
      const Value = await AsyncStorage.getItem(key);
      return Value != null && typeof Value == "object" ? JSON.parse(Value) : Value;
    } catch (e) {
      // error reading value
        console.log(e)
    }
  };

export default { storeData, getData }