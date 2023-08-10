import { View, Text } from "react-native";
import React from "react";
import { Focus, Bot , ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";


const Actions = () => {
  return (
    <View>
      <Link href={"/pestsnap"} className="my-3">
        <View className="w-80 bg-green-600 h-32 rounded-md flex flex-row p-5">
          <View className="flex flex-col justify-center items-center w-[20%]">
            <Focus color="white" size={70} />
          </View>
          <View className="flex flex-col justify-center items-center w-[70%]">
            <Text className="text-white text-2xl mb-2">Pest Snap</Text>
            <Text className="text-white text-sm text-center px-2">Take a picture of a pest to identify the Insect</Text>
          </View>
          <View className="flex flex-col justify-center items-center w-[10%]">
            <ChevronRight color="white" size={50} />
          </View>
        </View>
      </Link>

      <Link href={"/pestbot"} className="my-3">
        <View className="w-80 bg-purple-600 h-32 rounded-md flex flex-row p-5 mt-5">
          <View className="flex flex-col justify-center items-center w-[20%]">
            <Bot color="white" size={70} />
          </View>
          <View className="flex flex-col justify-center items-center w-[70%]">
            <Text className="text-white text-2xl">Pest Bot</Text>
            <Text className="text-white text-sm text-center px-2">Chat with our bot to get more information about pests</Text>
          </View>
          <View className="flex flex-col justify-center items-center w-[10%]">
            <ChevronRight color="white" size={50} />
          </View>
        </View>
      </Link>
    </View>
  );
};

export default Actions;
