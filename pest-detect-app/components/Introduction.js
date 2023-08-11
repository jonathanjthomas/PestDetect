import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useDetails } from "./Initiater";
import { Image } from "expo-image";


const Introduction = ({ showIntro, setIntroduction }) => {


    const [SliderState, setSliderState] = React.useState({ currentPage: 0 });
    const setSliderPage = (event) => {
        const { currentPage } = SliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / 320);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...SliderState,
                currentPage: indexOfNextScreen,
            });
        }
    }

    const { currentPage: pageIndex } = SliderState;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showIntro}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
            className=""
        >
            <View className="flex-1 items-center justify-center bg-white bg-opacity-50">
                <View className="bg-white w-80 h-full rounded-lg">
                    <View className="flex flex-row justify-center items-center p-3">
                        <Image source={require("../assets/logo.png")} style={{ width: 100, height: 100 }} />
                        <Text className="ml-5 text-xl font-semibold">PestDetect</Text>
                    </View>
                    <ScrollView horizontal={true} scrollEventThrottle={16} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={setSliderPage} className="">
                        <View className="w-80 p-3 h-fit justify-center items-center" >
                            <View className="w-[95%] h-48 ">
                                <Image style={{ width: "100%", height: "100%" }} className="rounded-md" source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/WhatsApp_Image_2023-08-09_at_18.45.13_rmoe1w.jpg"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Welcome to PestDetect!</Text>
                            <Text className="mt-5 text-center">An AI-powered mobile app that identifies stored grain pests and recommends sustainable management techniques.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-[70%] ">
                                <Image style={{ width: "100%", height: "100%", contentFit: "contain" }} className="object-contain" source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/WhatsApp_Image_2023-08-09_at_18.43.21_xyyldu.jpg"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Pest Snap</Text>
                            <Text className="mt-5 text-center">Snap a photo of a stored grain pest and use AI to identify the pest and converse with a chatbot on targeted sustainable pest prevention and management techniques.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-[70%]">
                                <Image style={{ width: "100px", height: "100%", contentFit: "contain" }} source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/Screenshot_2023-08-09_213940_jz86gd.png"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Pest Bot</Text>
                            <Text className="mt-5 text-center"> Chat wih Pest Bot to answer your questions about different stored grain pests and their management practices</Text>
                        </View>
                    </ScrollView>
                    <View className="w-full flex flex-row justify-center items-center h-20">
                        {Array.from(Array(3).keys()).map((key, index) => (
                            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                        ))}
                    </View>
                    <View className="flex justify-center items-center mb-7">
                        <Pressable onPress={() => setIntroduction(false)}>
                            <Text className="text-white p-2 bg-sky-500 w-48 rounded-md text-center"> Skip </Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
    },
});
export default Introduction;
