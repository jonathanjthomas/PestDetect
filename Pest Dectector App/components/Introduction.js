import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useDetails } from "./Initiater";
import { Image } from "expo-image";


const Introduction = ({showIntro, setIntroduction }) => {
    

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
                    <Text className="text-2xl my-5 text-center">Introduction To App</Text>
                    <ScrollView horizontal={true} scrollEventThrottle={16} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={setSliderPage} className="">
                        <View className="w-80 p-3 h-fit justify-center items-center" >
                            <View className="w-[95%] h-48 ">
                                <Image style={{ width: "100%", height: "100%" }} className="rounded-md" source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/WhatsApp_Image_2023-08-09_at_18.45.13_rmoe1w.jpg"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Welcome to the Pest Detect App</Text>
                            <Text className="mt-5 text-center">This app utilizes Artificial Intelligence to detect and provide sustainable methods to eradicate storage pests.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-[70%] ">
                                <Image style={{ width: "100%", height: "100%" , contentFit:"contain" }} className="object-contain" source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/WhatsApp_Image_2023-08-09_at_18.43.21_xyyldu.jpg"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Pest Snap</Text>
                            <Text className="mt-5 text-center">This module helps you with taking snaps of the storage pest using the phone camera and uses AI technology to analyze the pest after which it directs you to pest bot which provides details regarding the pests.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-[70%]">
                                <Image style={{ width: "100px", height: "100%" , contentFit:"contain"}} source={"https://res.cloudinary.com/cybertech13/image/upload/v1691602944/Pest%20Dectector/Screenshot_2023-08-09_213940_jz86gd.png"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Pest Bot</Text>
                            <Text className="mt-5 text-center">This module makes use of an AI chat bot to help you with identifying and providing information regarding pests.</Text>
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
