import { View, Text } from "react-native";
import React,{useEffect} from "react";
import Intiater,{useDetails} from "../components/Initiater"
import Actions from "../components/Actions";
import { getData } from "../utils/Storage";

const index = () => {
  const { Initiate, SetInitiate , SetAllowCancel ,setCountry } = useDetails()

  useEffect(() => {
    getData("Country").then((res) => {
      if (res) {
        setCountry(res);
        SetInitiate(false)
        SetAllowCancel(true)
      }
    });
  }, []);

  return (
    <View className="flex-1 items-center ">
      {Initiate && <Intiater />}
      <Text className="text-2xl my-10">Actions</Text>
      <Actions />
    </View>
  );
};

export default index;
