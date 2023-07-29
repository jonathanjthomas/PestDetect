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
            <View className="bg-white w-11/12 h-96 rounded-md p-5">
                <Text className="text-2xl border-b py-2 border-sky-500 mb-5">Prior Notes</Text>
                <Text className="my-1 text-lg "> 1. Ensure there is sufficient light or use the flashlight </Text>
                <Text className="my-1 text-lg "> 2. Ensure the pest is in focus </Text>
                <Text className="my-1 text-lg "> 3. Ensure the pest is in the center of the screen </Text>
                <Text className="my-1 text-lg "> 4. Ensure the pest is not obstructed by any other object </Text>

                <Pressable className="flex justify-center items-center bg-sky-500 p-2 rounded-md mt-4" onPress={() => setDisplay(false)}>
                    <Text className="text-white" > Got it </Text>
                </Pressable>
            </View>
        </View>
        </SafeAreaView>
    </Modal>
  );
};

export default InfoDisplayer;
