import { View } from "react-native";
import React from "react";
import { WebView } from 'react-native-webview';
import { Pest_Info } from "../components/Cam";


export default function Chatarea({count}) {

   
    const { Pest_Name  } = Pest_Info();
   

    return (
        <View className="w-full h-[93%]">
            <WebView source={{ uri: `http://159.122.175.197:31000/${Pest_Name ?`?Pest=${Pest_Name}`:""}` }} />
        </View>
    );
}
