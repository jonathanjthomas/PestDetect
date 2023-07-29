import { View, Text, Pressable } from "react-native";
import React from "react";
import { Home, Globe } from "lucide-react-native";
import { router } from "expo-router";
import { useDetails } from "./Initiater.js"
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Navbar = () => {
    const ProceedHome = () => router.push("/");
    const { ToggleInitiate } = useDetails();

    const insets = useSafeAreaInsets();
    
    return (
            <View style={{paddingTop: insets.top+15}} className="w-full h-fit bg-sky-500 flex flex-row justify-between px-4 pb-5 ">
                <Pressable onPress={ProceedHome} className="flex flex-row items-center">
                    <Home color="white" />
                    <Text className="text-white" > Home </Text>
                </Pressable>
                <Pressable onPress={ToggleInitiate} className="flex flex-row items-center">
                    <Text className="text-white" > Country </Text>
                    <Globe color="white" />
                </Pressable>
            </View>

    );
};

export default Navbar;
