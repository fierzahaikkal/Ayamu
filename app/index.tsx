import { Link } from 'expo-router';
import { Button, Paragraph, YStack, ZStack } from 'tamagui';

import { Container } from '~/components/Container';
import { Title } from '~/tamagui.config';
import { LoadData } from '~/utils/load-data';

export default function Home() {
  return (
    <Container>
      <LoadData />
      <Title>Ayamu!</Title>
      <ZStack maxWidth={120} maxHeight={100} width={100} flex={1}>
        <YStack fullscreen borderRadius="$4" padding="$2" borderColor="$color" borderWidth={2} />
        <YStack
          borderColor="$color"
          fullscreen
          y={10}
          x={10}
          borderWidth={2}
          borderRadius="$4"
          padding="$2"
        />
        <YStack
          borderColor="$color"
          fullscreen
          y={20}
          x={20}
          borderWidth={2}
          borderRadius="$4"
          padding="$2"
        />
      </ZStack>
      <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
        <Button>Deteksi Penyakit</Button>
      </Link>
      <Link href={{ pathname: '/disease' }} asChild>
<<<<<<< Updated upstream
        <Button>Daftar Penyakit</Button>
=======
        <Button>Informasi penyakit</Button>
>>>>>>> Stashed changes
      </Link>
      <Paragraph color="$gray10Dark">Version 1.0.0 &#169; Reserved 2024</Paragraph>
    </Container>
  );
}
