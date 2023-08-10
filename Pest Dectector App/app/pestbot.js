import { View } from "react-native";
import React from "react";
import Chatarea from "../components/Chatarea";

const pestbot = () => {  
  return (
    <View>
      <Chatarea showIntro={true} count={0}/>
    </View>
  );
};

export default pestbot;
