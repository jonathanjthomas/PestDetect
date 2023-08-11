import React from "react";
import { Slot } from 'expo-router';
import Navbar from "../components/Navbar";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const _layout = () => {
    return (<>
        <SafeAreaProvider>
            <Navbar />
            <Slot />
        </SafeAreaProvider>
    </>
    );
};

export default _layout;
