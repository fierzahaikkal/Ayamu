import { atom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { dataDisease } from '~/assets/static/data';
import { IDisease } from '~/types/disease';

export const jsonDataAtom = atom<IDisease[] | null>(null);
export const selectedTypeAtom = atom<string>('');

export const LoadData: React.FC = () => {
  const setData = useSetAtom(jsonDataAtom);

  useEffect(() => {
    const loadData = () => {
      setData(dataDisease);
    };
    loadData();
  }, [setData]);
  return null;
};
