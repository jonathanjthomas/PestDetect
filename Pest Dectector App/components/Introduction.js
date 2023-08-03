import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useDetails } from "./Initiater";
import { Image } from "expo-image";
import { Dimensions } from "react-native";

const Introduction = ({ setIntroduction }) => {
    const { Initiate, showIntro } = useDetails();
    const { width } = Dimensions.get("window");

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
            <View className="flex-1 items-center justify-center bg-sky-500 bg-opacity-50">
                <View className="bg-white w-80 h-5/6 rounded-lg">
                    <Text className="text-2xl my-5 text-center">Introduction To App</Text>
                    <ScrollView horizontal={true} scrollEventThrottle={16} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={setSliderPage} className="">
                        <View className="w-80 p-3 h-fit justify-center items-center" >
                            <View className="w-[95%] h-48">
                                <Image style={{ width: "100%", height: "100%" }} source={"https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Native_Tutorial.jpg"} />
                            </View>
                            <Text className="mt-5 text-center">This app utilizes Artificial Intelligence to detect and provide sustainable methods to eradicate storage pests.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-48">
                                <Image style={{ width: "100%", height: "100%" }} source={"https://repository-images.githubusercontent.com/329723227/62ff9135-2763-4fba-ae7f-0b1eefa0ea56"} />
                            </View>
                            <Text className="mt-5 text-xl font-semibold">Pest Snap</Text>
                            <Text className="mt-5 text-center">This module helps you with taking snaps of the storage pest using the phone camera and uses AI technology to analyze the pest after which it directs you to pest bot which provides details regarding the pests.</Text>
                        </View>
                        <View className="w-80 h-fit justify-center items-center p-3" >
                            <View className="w-[95%] h-48">
                                <Image style={{ width: "100%", height: "100%" }} source={"https://repository-images.githubusercontent.com/329723227/62ff9135-2763-4fba-ae7f-0b1eefa0ea56"} />
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
                            <Text className="text-white p-2 bg-sky-500 w-48 rounded-md text-center"> Understood </Text>
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
