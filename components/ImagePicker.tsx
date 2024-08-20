import { Camera, Image as iconImage } from '@tamagui/lucide-icons';
import React, { useEffect } from 'react';
import { Button, Image, View, XStack } from 'tamagui';

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
      {imageUri && <Image source={{ uri: imageUri }} style={{ height: 350, width: 350 }} />}
      <XStack gap="$3" alignItems="center" justifyContent="center" marginTop="$6">
        <Button onPress={captureImage} icon={Camera}>
          Foto Objek
        </Button>
        <Button onPress={pickImage} icon={iconImage}>
          Gallery
        </Button>
      </XStack>
    </View>
  );
};
