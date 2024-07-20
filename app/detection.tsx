import { Dialog } from '@tamagui/dialog';
import { ArrowLeft, X } from '@tamagui/lucide-icons';
import * as tf from '@tensorflow/tfjs';
import { Link, router } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Button, ScrollView, XStack, Unspaced } from 'tamagui';

import { Container } from '~/components/Container';
import { ImagePickerComponents } from '~/components/ImagePicker';
import { Subtitle, Title } from '~/tamagui.config';
import { imageToTensor } from '~/utils/imageUtils';
import { makePrediction, modelAtom } from '~/utils/load-model';

const Detection: React.FC = () => {
  const [model] = useAtom(modelAtom);
  const [prediction, setPrediction] = useState<tf.Tensor | null>(null);
  const [predictedClass, setPredictedClass] = useState<string>('Tidak diketahui');
  const [predictedType, setPredictedType] = useState<string>('Tidak diketahui');
  const [accuracy, setAccuracy] = useState<number>(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [message, setMessage] = useState<string>();

  const diseaseClasses = ['Coccidiosis', 'Sehat', 'New Castle Disease', 'Salmonella'];
  const diseasetipe = ['coccidio', 'sehat', 'ncd', 'salmonella'];

  const handleImageSelected = async (uri: string) => {
    try {
      if (model) {
        const imageTensor = await imageToTensor(uri);
        const { predictedClassIndex, predictionScores } = makePrediction(model, imageTensor);

        setPredictedClass(diseaseClasses[predictedClassIndex]);
        setPredictedType(diseasetipe[predictedClassIndex]);
        setAccuracy(predictionScores[predictedClassIndex]);
        setDialogVisible(true);

        if (diseasetipe[predictedClassIndex] === 'sehat') {
          setMessage(
            'Kondisi ayam baik, tetap jaga kondisi ayam dengan melakukan pengecekan rutin pada ayam dan menjaga kebersihan kandang dan pakan'
          );
        }
      } else {
        console.error('Model not loaded yet');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  const navigateToMoreInfo = (tipe: string) => {
    setDialogVisible(false);
    return router.navigate(`/details/${tipe}`);
  };

  return (
    <Container>
      <Link href={{ pathname: '/' }} asChild>
        <Button icon={ArrowLeft}>Kembali</Button>
      </Link>
      <Subtitle>Periksa ayammu</Subtitle>
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
            gap="$4"
            paddingTop="$7"
            width={350}>
            <Dialog.Title>{predictedClass}</Dialog.Title>
            <Dialog.Description>Accuracy: {(accuracy * 100).toFixed(2)}%</Dialog.Description>
            {predictedClass === 'Sehat' && (
              <Dialog.Description>Pesan: {message}</Dialog.Description>
            )}
            <XStack alignSelf="flex-end" gap="$4">
              {predictedClass !== 'Sehat' && (
                <Button onPress={() => navigateToMoreInfo(predictedType)}>
                  Pelajari lebih lanjut
                </Button>
              )}
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
