import { View } from "react-native";
import React from "react";
import { WebView } from 'react-native-webview';

export default function Chatarea({Pest}) {
    return (
        <View className="w-full h-[93%]">
            <WebView source={{ uri: `http://159.122.175.197:31000/${Pest ?`?Pest=${Pest}`:""}` }}  />
        </View>
    );
}
