import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    } else {
      console.error('Image picking was canceled or no assets found');
    }
  };

  const captureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    } else {
      console.error('Image capture was canceled or no assets found');
    }
  };

  return { imageUri, pickImage, captureImage };
};
