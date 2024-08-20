import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';

export const imageToTensor = async (uri: string): Promise<tf.Tensor> => {
  try {
    // Fetch the image as a binary data
    const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert the base64 binary data to a Uint8Array
    const imgBuffer = tf.util.encodeString(response, 'base64').buffer;
    const imageData = new Uint8Array(imgBuffer);

    // Decode the image data to a tensor
    const imageTensor = decodeJpeg(imageData);

    // Resize the image to 224x224
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);

    // Expand dimensions to match the model's input shape
    const expandedImageTensor = resizedImageTensor.expandDims(0);
    return expandedImageTensor;
  } catch (error) {
    console.error('Failed to convert image to tensor:', error);
    throw new Error('Failed to convert image to tensor');
  }
};
