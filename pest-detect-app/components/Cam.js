import { View, Text, Pressable, ActivityIndicator, Modal } from "react-native";
import React, { useRef } from "react";
import { Camera, CameraType } from 'expo-camera';
import { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { Aperture, Flashlight, GalleryHorizontalEnd, ChevronRight, Repeat2 } from "lucide-react-native";
import { create } from 'zustand'
import InfoDisplayer from "./InfoDisplayer";
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from "expo-image-editor";
import { Image as VIM } from 'expo-image';
import ImageHelper from "../utils/ImageHelper";
import axios from "axios";
import { router } from 'expo-router';


// State Management for Camera
export const useCamera = create((set) => ({
    CameraReady: false,
    setCameraReady: (CameraReady) => set({ CameraReady }),
    Pause: false,
    setPause: (Pause) => set({ Pause }),
    Zoom: 0,
    setZoom: (Zoom) => set({ Zoom }),
    PicLoading: false,
    setPicLoading: (PicLoading) => set({ PicLoading }),
    pictureSize: "224x224",
    setPictureSize: (pictureSize) => set({ pictureSize }),
    flashMode: false,
    setflashMode: (flashMode) => set({ flashMode }),
    Image: null,
    setImage: (Image) => set({ Image }),
    FinalImage: null,
    setFinalImage: (FinalImage) => set({ FinalImage }),
}));

export const Pest_Info = create((set) => ({
    Pest_Name: null,
    setPest_Name: (Pest_Name) => set({ Pest_Name }),
    Status: null,
    setStatus: (Status) => set({ Status }),
}));

const Cam = () => {

    // Camera Permissions
    const [permission, requestPermission] = Camera.useCameraPermissions();

    // Camera States
    const { CameraReady, setCameraReady, Pause, setPause, Zoom, setZoom, PicLoading, setPicLoading, pictureSize, setPictureSize, flashMode, setflashMode, Image, setImage, FinalImage, setFinalImage } = useCamera();

    // Pest Info States

    const PestInfo = Pest_Info((state) => state);

    // Camera Ref
    let camera = useRef(null);


    // Request Permission on Mount
    useEffect(() => {
        if (permission?.status !== 'granted') {
            requestPermission();
        }

    }, []);

    // Crop Image using the Image Helper
    useEffect(() => {
        if (FinalImage) {
            (async () => {
                const result = await ImageHelper.cropPicture({
                    uri: FinalImage.uri,
                    width: FinalImage.width,
                    height: FinalImage.height,
                }, 256);

                setFinalImage({ uri: result.uri, width: result.width, height: result.height, base64: result.base64 });
            })();
        }

        else if (!Image) {
            setPause(false);
        }
    }, [Image]);


    //Set Camera Ready and get Picture Sizes available
    const CamReady = () => {
        setCameraReady(true);

        let sizes = null;
        (async () => {
            sizes = await camera.current.getAvailablePictureSizesAsync("1:1")
        })();

        if (sizes) {
            setPictureSize(sizes[0])
        }
    }

    // Toggle Torch
    const ToggleTorch = () => setflashMode(!flashMode);

    // Take Picture
    const TakePicture = async () => {
        setPicLoading(true);
        const data = await camera.current.takePictureAsync();

        setPicLoading(false);
        setPause(true);
        setflashMode(false);
        setImage(data.uri);
    }

    // Pick Image from Gallery
    const pickImage = async () => {
        setPause(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.assets && result.assets[0] && result.assets[0].uri) {
            setImage(result.assets[0].uri);
        } else {
            setPause(false);
        }
    };

    // Proceed with Image classification
    const classifyImage = async () => {

        try{

            PestInfo.setStatus("Loading");
            const result = await axios.post("http://159.122.175.197:32000/process_image", { base64_image: FinalImage.base64 })
           
            PestInfo.setPest_Name(result.data.Pest);
            PestInfo.setStatus("Done");

            console.log(result.data.Pest);
            setFinalImage(null);
            router.push("/pestbot");
        } catch(err){
            console.log(err);
            router.replace("/")
        }


    }



    return (
        <View className="flex justify-center items-center">

            {/* Head Text */}
            <Text className="text-2xl mt-5">Pest Snap</Text>
            <Text className="my-3"> Focus on the pest for the best results</Text>
            <InfoDisplayer />


            {/* Camera Display View */}
            <View className="w-full h-96 bg-black flex flex-col justify-center items-center">

                {/* Camera Element */}
                <View className="w-full h-96">
                    {!Pause && <Camera style={{ "width": "100%", "height": "100%" }} onCameraReady={CamReady} useCamera2Api={true} zoom={Zoom} type={CameraType.back} ref={camera} ratio="1:1" pictureSize={pictureSize} flashMode={flashMode ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off} ></Camera>}
                </View>

                {/* No Access to Camera */}
                {permission?.status !== 'granted' && <View className="absolute z-20 w-80 h-80 flex justify-end items-center ">
                    <Pressable className="flex justify-center items-center bg-sky-500 p-2 rounded-md mt-4 w-32" onPress={() => { requestPermission(); }}>
                        <Text className="text-white" > Allow </Text>
                    </Pressable>
                    <Text className="text-white text-center pt-2">Want to snap a photo?</Text>
                    <Text className="text-white text-center">Please allow access to the camera</Text>
                </View>
                }

                {/* Loading Indicator */}
                {
                    PicLoading && <View className="absolute w-80 h-80 bg-white/50 flex justify-center items-center ">
                        <ActivityIndicator size="large" />
                    </View>
                }



                {/* Image Preview */}
                {
                    (Pause && FinalImage) && <View className="absolute z-0 h-96 bg-black w-full">
                        <VIM source={{ uri: FinalImage?.uri }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                        <Text className="text-white text-center">Crop the image to the pest</Text>
                    </View>
                }

            </View>

            {/* Zoom Slider */}
            {!(Pause && FinalImage) && <View className="w-80 flex flex-row justify-center items-center">
                <Text className="">Zoom: </Text>
                <View className="w-60 h-20 flex flex-row justify-center items-center">
                    <Slider
                        style={{ width: "100%", height: "100%", borderCurve: "20px" }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#0284c7"
                        maximumTrackTintColor="#dc262"
                        onValueChange={(value) => {
                            setZoom(value);
                        }}
                        disabled={permission?.status !== 'granted' || Pause}
                    />
                </View>
            </View>}



            {/* Proceed Button */}
            {
                Pause && FinalImage && <View className="w-full h-20 flex justify-center items-center pb-4 mt-5">
                    <Pressable className="flex flex-row justify-center items-center bg-green-500 p-2 rounded-md mt-4 w-48" onPress={classifyImage}>
                        <Text className="text-white text-lg" > Proceed </Text>
                        <ChevronRight className="ml-2" color="white" size={20} />
                    </Pressable>
                </View>

            }

            {/* Retake Button */}
            {
                ((FinalImage)) && <View className=" w-full h-20 flex justify-start items-center pb-4 mt-5">

                    <Pressable className="flex flex-row justify-center items-center bg-purple-500 p-2 rounded-md mt-4 w-32" onPress={() => { setPause(false); setFinalImage(null) }}>
                        <Text className="text-white" > Retake </Text>
                        <Repeat2 className="ml-2" color="white" size={15} />
                    </Pressable>
                    <Text className="text-black text-center mt-2">Not satisfied with the image?</Text>
                </View>
            }

            {/* Camera Controls */}
            {!(Pause && FinalImage) && <View className="w-96 h-20 flex flex-row justify-evenly items-center mt-5">

                {/* Flashlight */}
                <View className="w-20 flex justify-center items-center">
                    <Pressable disabled={permission?.status !== 'granted' || !CamReady} onPress={ToggleTorch}>
                        <Flashlight color="black" size={50} />
                    </Pressable>
                    <Text className="mt-4">Torch</Text>
                </View>

                {/* Take Picture */}
                <View className="w-20 flex justify-center items-center">
                    <Pressable disabled={permission?.status !== 'granted' || Pause} onPress={TakePicture}>
                        <Aperture color="red" size={60} />
                    </Pressable>
                    <Text className="mt-4">Take Picture</Text>
                </View>

                {/* Select from Gallery */}
                <View className="w-20 flex justify-center items-center">
                    <Pressable onPress={pickImage}>
                        <GalleryHorizontalEnd color="black" size={50} />
                    </Pressable>
                    <Text className="mt-4 text-center">Select from Gallery</Text>
                </View>
            </View>}

            {/* Image Editor */}
            <Modal visible={Image ? true : false} animationType="slide">
                <Text className="text-xl bg-gray-700 text-white h-12 flex justify-center text-center py-2"> Crop image to fit one pest </Text>
                <ImageEditor visible={true} imageUri={Image} onCloseEditor={() => { if (!Image) setPause(false); setImage(null); }}
                    onEditingComplete={(result) => {
                        setImage(null);
                        setFinalImage({ uri: result.uri, width: result.width, height: result.height });
                        setflashMode(false);
                    }}
                    onEditingCanceled={() => { setFinalImage(null) }}
                    fixedCropAspectRatio={1}
                    lockAspectRatio={true}
                    minimumCropDimensions={{ width: 224, height: 224 }}
                    mode="crop-only"
                    asView={true}
                    className="flex-1"
                />
            </Modal>

            {/* Loader */}
            <Modal visible={PestInfo.Status === "Loading"} animationType="slide">
                <View className="flex-1 flex justify-center items-center">
                    <ActivityIndicator className="text-xl" size="large" color="#0ea5e9" />
                    <Text className="text-xl mt-5">Identifying the pest, hold on ... </Text>
                </View>
            </Modal>


        </View>
    );

};

export default Cam;

