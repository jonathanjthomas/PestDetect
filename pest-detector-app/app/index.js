import { View, Text, Pressable } from "react-native";
import React,{useEffect} from "react";
import Intiater,{useDetails} from "../components/Initiater"
import Actions from "../components/Actions";
import { getData , removeData } from "../utils/Storage";
import Introduction from "../components/Introduction";

const index = () => {
  const { Initiate, SetInitiate , SetAllowCancel ,setCountry , Intro , setIntroduction } = useDetails()

  useEffect(() => {
    getData("Country").then((res) => {
      if (res) {
        setCountry(res);
        SetInitiate(false)
        SetAllowCancel(true)
        setIntroduction(false)
      }
    });
  }, []);

  const mode = "Prod"
  return (
    <View className="flex-1 items-center ">
      {Intro && <Introduction showIntro={Intro} setIntroduction={setIntroduction}  />}
      {Initiate && <Intiater />}
      <Text className="text-2xl my-10">Actions</Text>
      <Actions />

      { mode=="Debug" && <Pressable onPress={() => {removeData("Country"); console.log("removed"); SetInitiate(true)}}>
        <Text className="text-white p-3 bg-blue-500 ">Remove</Text>
      </Pressable>}
    </View>
  );
};

export default index;
