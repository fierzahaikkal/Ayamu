import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

export const imageToTensor = async (uri: string): Promise<tf.Tensor> => {
  try {
    const response = await fetch(uri);
    const imageData = await response.arrayBuffer();
    const imageTensor = decodeJpeg(new Uint8Array(imageData));
    return imageTensor;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to convert image to tensor');
  }
};
