import { View, Text, Pressable } from "react-native";
import React from "react";
import { Home, Globe } from "lucide-react-native";
import { router } from "expo-router";
import { useDetails } from "./Initiater.js"

const Navbar = () => {
    const ProceedHome = () => router.push("/");
    const { ToggleInitiate } = useDetails();
    
    return (
        <View className="fixed">
            <View className="w-full h-24 bg-sky-500 pt-10 flex flex-row justify-between  px-4 ">
                <Pressable onPress={ProceedHome} className="flex flex-row items-center">
                    <Home color="white" />
                    <Text className="text-white" > Home </Text>
                </Pressable>
                <Pressable onPress={ToggleInitiate} className="flex flex-row items-center">
                    <Text className="text-white" > Country </Text>
                    <Globe color="white" />
                </Pressable>
            </View>
        </View>

    );
};

export default Navbar;
