import { useEffect } from 'react';
import { Image } from 'react-native';
import { Button, View } from 'tamagui';

import { useImagePicker } from '~/hooks/useImagePicker';

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
}

export const ImagePickerComponents: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const { imageUri, pickImage, captureImage } = useImagePicker();

  useEffect(() => {
    if (imageUri) {
      onImageSelected(imageUri);
      console.log(imageUri);
    }
  }, [imageUri, onImageSelected]);

  return (
    <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />}
      <Button onPress={captureImage}>Foto Objek</Button>
      <Button onPress={pickImage}>Gallery</Button>
    </View>
  );
};
