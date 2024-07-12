import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import { Text, View } from 'tamagui';

import { ImagePickerComponents } from '~/components/ImagePicker';
import { Subtitle, Title } from '~/tamagui.config';
import { imageToTensor } from '~/utils/imageUtils';
import { loadModel, makePrediction } from '~/utils/load-model';

const Detection: React.FC = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);

  useEffect(() => {
    const loadTfModel = async () => {
      await tf.ready();
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

  return (
    <View>
      <Title>Detection Page</Title>
      <ImagePickerComponents onImageSelected={handleImageSelected} />
      {prediction && <Subtitle>Prediction: {prediction.toString()}</Subtitle>}
    </View>
  );
};

export default Detection;
