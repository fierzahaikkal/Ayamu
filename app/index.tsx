import { registerRootComponent } from 'expo';
import { Link } from 'expo-router';
import { Image } from 'react-native';
import { Button, Paragraph, YStack, ZStack } from 'tamagui';
import * as tf from '@tensorflow/tfjs';

import { Container } from '~/components/Container';
import { Title } from '~/tamagui.config';
import { LoadData } from '~/utils/load-data';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { loadModel, modelAtom } from '~/utils/load-model';

export default function Home() {
  const setModel = useSetAtom(modelAtom);

  useEffect(() => {
    const loadTfModel = async () => {
      await tf.ready();
      const loadedModel = await loadModel();
      setModel(loadedModel);
    };
    loadTfModel();
  }, [setModel]);

  return (
    <Container>
      <LoadData />
      <Title>Ayamu</Title>
      <Image
        source={require('~/assets/images/chicken-logo.jpg')}
        style={{ width: 300, height: 300 }}
      />
      <Link href={{ pathname: '/detection' }} asChild>
        <Button>Pindai penyakit</Button>
      </Link>
      <Link href={{ pathname: '/disease' }} asChild>
        <Button>Informasi kesehatan</Button>
      </Link>
      <Paragraph color="$gray10Dark">Version 1.0.0 &#169; Reserved 2024</Paragraph>
    </Container>
  );
}

registerRootComponent(Home);
