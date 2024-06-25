import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export const loadModel = async (modelUrl: string) => {
  await tf.ready();
  const model = await tf.loadLayersModel(modelUrl);
  return model;
};

export const makePrediction = (model: tf.LayersModel, inputData: tf.Tensor) => {
  const prediction = model.predict(inputData) as tf.Tensor;
  return prediction;
};
