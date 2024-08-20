import * as tf from '@tensorflow/tfjs';
import { registerRootComponent } from 'expo';
import { Link } from 'expo-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Image } from 'react-native';
import { Button, Paragraph } from 'tamagui';

import { Container } from '~/components/Container';
import { LoadData } from '~/utils/load-data';
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
      <Image
        source={require('~/assets/images/chicken-logo.png')}
        style={{ width: 350, height: 350 }}
      />
      <Link href={{ pathname: '/detection' }} asChild>
        <Button>Pindai penyakit</Button>
      </Link>
      <Link href={{ pathname: '/disease' }} asChild>
        <Button>Daftar Penyakit</Button>
        <Button>Informasi penyakit</Button>
      </Link>
      <Paragraph color="$gray10Dark">Version 1.0.0 &#169; Reserved 2024</Paragraph>
    </Container>
  );
}

registerRootComponent(Home);
