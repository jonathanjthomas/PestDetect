import * as ImageManipulator from 'expo-image-manipulator';

export const cropPicture = async (imageData, maskDimension) => {
  try {
    const {uri, width, height} = imageData;
    const actions = [
      {
        resize: {
          width: maskDimension,
          height: maskDimension,
        },
      },
    ];
    const saveOptions = {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  } catch (error) {
    console.log('Could not crop & resize photo', error);
  }
};

export default {cropPicture};