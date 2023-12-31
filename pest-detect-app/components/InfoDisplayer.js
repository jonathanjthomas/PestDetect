import { View, Text , Modal, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoDisplayer = () => {
    const [Display , setDisplay] = React.useState(true)
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={Display}
    >
        <SafeAreaView className="flex-1">

        <View className="flex-1 items-center justify-center bg-sky-500 bg-opacity-50">
            <View className="bg-white w-11/12 h-96 rounded-md p-3">
                <Text className="text-2xl border-b py-2 border-sky-500 mb-5">Please ensure the following:</Text>
                <Text className="mt-1 text-lg "> 1. There is sufficient light or use the flashlight </Text>
                <Text className="mt-1 text-lg "> 2. The pest is in focus </Text>
                <Text className="mt-1 text-lg "> 3. The pest is in the center of the screen </Text>
                <Text className="mt-1 text-lg "> 4. The pest is not obstructed by other objects </Text>
                <Pressable className="flex justify-center items-center bg-sky-500 p-2 rounded-md mt-4" onPress={() => setDisplay(false)}>
                    <Text className="text-white" > Ok </Text>
                </Pressable>
            </View>
        </View>
        </SafeAreaView>
    </Modal>
  );
};

export default InfoDisplayer;
