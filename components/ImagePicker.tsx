import { useEffect } from 'react';
import { Button, Image, View } from 'tamagui';

import { useImagePicker } from '~/hooks/useImagePicker';

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
}

export const ImagePickerComponents: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const { imageUri, pickImage, captureImage } = useImagePicker();

  useEffect(() => {
    if (imageUri) {
      onImageSelected(imageUri);
    }
  }, [imageUri]);

  return (
    <View>
      {imageUri && <Image source={{ uri: imageUri }} />}
      <Button onPress={captureImage}>Foto Objek</Button>
      <Button onPress={pickImage}>Gallery</Button>
    </View>
  );
};
