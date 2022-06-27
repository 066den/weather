import { useMemo } from 'react';

interface IDate {
  time: string;
  date: string;
}

export const useDate = (dt: any): IDate => {
  const locale = 'en';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date(dt);

  const date = useMemo(() => {
    return `${today.getDate()} ${today.toLocaleDateString(locale, {
      month: 'long',
    })}`;
  }, [today]);

  const time = useMemo(() => {
    return today.toLocaleTimeString(locale, {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    });
  }, [today]);

  return {
    date,
    time,
  };
};
