import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { atom } from 'jotai';

import { modelWeights } from '~/assets/static/weights';

export const modelAtom = atom<tf.LayersModel | null>(null);

export const loadModel = async () => {
  await tf.ready();
  const modelJson = require('~/assets/jsmodel/model.json');

  try {
    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};

export const makePrediction = (model: tf.LayersModel, inputData: tf.Tensor) => {
  const prediction = model.predict(inputData) as tf.Tensor;
  const predictedClassIndex = prediction.argMax(-1).dataSync()[0];
  const predictionScores = prediction.dataSync();
  return { prediction, predictedClassIndex, predictionScores };
};
