import { Dialog } from '@tamagui/dialog';
import { X } from '@tamagui/lucide-icons';
import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, Sheet, XStack, Unspaced } from 'tamagui';

import { ImagePickerComponents } from '~/components/ImagePicker';
import { Container, Subtitle, Title } from '~/tamagui.config';
import { imageToTensor } from '~/utils/imageUtils';
import { loadModel, makePrediction } from '~/utils/load-model';

const Detection: React.FC = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const loadTfModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await loadModel();
        setModel(loadedModel);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadTfModel();
  }, []);

  const handleImageSelected = async (uri: string) => {
    try {
      console.log('Image URI:', uri);
      if (model) {
        const imageTensor = await imageToTensor(uri);
        console.log('Image Tensor:', imageTensor);
        const pred = makePrediction(model, imageTensor);
        console.log('Prediction:', pred);
        setPrediction(pred);
        setDialogVisible(true);
      } else {
        console.error('Model not loaded yet');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  const handleClosePopup = () => {
    setDialogVisible(false);
  };

  const navigateToMoreInfo = () => {
    // Logic to navigate to more information page
    console.log('Navigating to more information...');
  };

  const getPredictionInfo = () => {
    if (prediction) {
      const predictedClass = prediction.argMax(-1).dataSync()[0];
      const predictedAccuracy = prediction.max().dataSync()[0];
      return { predictedClass, predictedAccuracy };
    }
    return { predictedClass: 'Unknown', predictedAccuracy: 0 };
  };

  const { predictedClass, predictedAccuracy } = getPredictionInfo();

  return (
    <Container>
      <Title>Detection Page</Title>
      <ImagePickerComponents onImageSelected={handleImageSelected} />
      <Dialog modal open={dialogVisible} onOpenChange={setDialogVisible}>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="lazy"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4">
            <Dialog.Title>Prediction Result</Dialog.Title>
            <Dialog.Description>
              Class: {predictedClass}
              Accuracy: {predictedAccuracy.toFixed(2)}
            </Dialog.Description>
            <XStack alignSelf="flex-end" gap="$4">
              <Button onPress={navigateToMoreInfo}>More Information</Button>
              <Dialog.Close asChild>
                <Button theme="active" aria-label="Close" onPress={handleClosePopup}>
                  Close
                </Button>
              </Dialog.Close>
            </XStack>
            <Unspaced>
              <Dialog.Close asChild>
                <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      {prediction && (
        <ScrollView>
          <Subtitle>Prediction: {prediction.toString()}</Subtitle>
        </ScrollView>
      )}
    </Container>
  );
};

export default Detection;
