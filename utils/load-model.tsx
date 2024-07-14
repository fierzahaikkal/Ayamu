import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import { modelWeights } from '~/assets/static/weights';

// class L2Regularizer extends regularizers.L1L2 {
//   constructor(config: { l2: number }) {
//     super({ l2: config.l2 });
//   }

//   static fromConfig(cls: any, config: { l2: number }) {
//     return new cls(config);
//   }
// }

// // Register the custom regularizer
// tf.serialization.registerClass(L2Regularizer);

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
  return prediction;
};
