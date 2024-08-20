import { ChevronDown, ArrowLeft } from '@tamagui/lucide-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, Image, Accordion, Paragraph, Square, ScrollView } from 'tamagui';

import { Container } from '~/components/Container';
import { Subtitle } from '~/tamagui.config';
import { jsonDataAtom, selectedTypeAtom } from '~/utils/load-data';

const Page = () => {
  const [data] = useAtom(jsonDataAtom);
  const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
  const { tipe } = useLocalSearchParams<{ tipe: string }>();

  useEffect(() => {
    if (tipe) {
      setSelectedType(tipe);
    }
  }, [tipe, setSelectedType]);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const filteredData = selectedType
    ? data.filter((disease) => disease.tipe === selectedType)
    : null;

  type imgType = {
    [key: string]: any;
  };

  const images: imgType = {
    'salmonella.png': require('../../assets/images/salmonella.png'),
    'coccidio.jpg': require('../../assets/images/coccidio.jpg'),
    'ncd.jpeg': require('../../assets/images/ncd.jpeg'),
  };

  return (
    <>
      <ScrollView>
        <Container>
          <Link href={{ pathname: '/disease' }} asChild>
            <Button icon={ArrowLeft}>Kembali</Button>
          </Link>

          {filteredData?.map((data) => (
            <Accordion overflow="hidden" width="$20" type="multiple" gap="$4" key={data.id}>
              <Subtitle>{data.penyakit}</Subtitle>
              <Image
                source={{
                  uri: images[data.gambar],
                  height: 300,
                }}
              />
              <Paragraph textAlign="justify" alignItems="center" color="$color1">
                {data.deskripsi}
              </Paragraph>
              <Accordion.Item value="penyebab">
                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph>Penyebab Penyakit</Paragraph>
                      <Square rotate={open ? '180deg' : '0deg'}>
                        <ChevronDown size="$1" />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.Content exitStyle={{ opacity: 0 }} gap="$4">
                  {data.penyebab.map((sebab, index) => (
                    <Paragraph key={index}>{sebab}</Paragraph>
                  ))}
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="solusi">
                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                  {({ open }: { open: boolean }) => (
                    <>
                      <Paragraph>Gejala Penyakit</Paragraph>
                      <Square rotate={open ? '180deg' : '0deg'}>
                        <ChevronDown size="$1" />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.Content exitStyle={{ opacity: 0 }} gap="$4">
                  {data.gejala.map((gejala, index) => (
                    <Paragraph key={index}>{gejala}</Paragraph>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          ))}
        </Container>
      </ScrollView>
    </>
  );
};

export default Page;
