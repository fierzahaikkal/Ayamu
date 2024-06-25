import { ChevronDown, ArrowLeft } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import React from 'react';
import { Accordion, Button, Paragraph, ScrollView, Square } from 'tamagui';

import { Container } from '~/components/Container';
import { IDisease } from '~/types/disease';
import { jsonDataAtom } from '~/utils/load-data';

const Disease = () => {
  const [data] = useAtom(jsonDataAtom);
  return (
    <ScrollView>
      <Container>
        <Link href={{ pathname: '/' }} asChild>
          <Button alignSelf="center" icon={ArrowLeft} size="$4">
            Kembali
          </Button>
        </Link>

        {data?.map((disease: IDisease) => (
          <Accordion overflow="hidden" width="$20" type="multiple" gap="$6" key={disease.id}>
            <Accordion.Item value="salmonella">
              <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({ open }: { open: boolean }) => (
                  <>
                    <Paragraph>{disease.penyakit}</Paragraph>
                    <Square rotate={open ? '180deg' : '0deg'}>
                      <ChevronDown size="$1" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.Content exitStyle={{ opacity: 0 }} gap="$4">
                <Paragraph>{disease.deskripsi}</Paragraph>
                <Link
                  href={{ pathname: '/preventive/[tipe]', params: { tipe: disease.tipe } }}
                  asChild>
                  <Button alignSelf="center" size="$3">
                    Pelajari lebih lanjut
                  </Button>
                </Link>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ))}
      </Container>
    </ScrollView>
  );
};

export default Disease;
