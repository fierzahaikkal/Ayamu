import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'tamagui';

import { ImagePickerComponents } from '~/components/ImagePicker';
import { imageToTensor } from '~/utils/imageUtils';
import { loadModel, makePrediction } from '~/utils/load-model';

const Detection = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);

  useEffect(() => {
    const loadTfModel = async () => {
      const modelUrl = '../SavedModel-20240624T085806Z-001/jsmodel/model.json';
      const loadedModel = await loadModel(modelUrl);
      setModel(loadedModel);
    };
    loadTfModel();
  }, []);

  const handleImageSelected = async (uri: string) => {
    if (model) {
      const imageTensor = await imageToTensor(uri);
      const pred = makePrediction(model, imageTensor);
      setPrediction(pred);
    }
  };

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return null;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <>
  //       <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission}>grant permission</Button>
  //     </>
  //   );
  // }

  return (
    <View>
      <ImagePickerComponents onImageSelected={handleImageSelected} />
      {prediction && <Text>Prediction: {prediction.toString()}</Text>}
    </View>
  );
};

export default Detection;
