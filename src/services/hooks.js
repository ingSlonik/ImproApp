// @flow
import {useState, useEffect} from 'react';

export function useMounted(): {current: boolean} {
  const [isMounted] = useState({current: true});
  useEffect(() => () => {
    isMounted.current = false;
  });
  return isMounted;
}

export function useTimer(onChange: number => mixed) {
  const [time, setTime] = useState<number>(0);
  const [timeFrom, setTimeFrom] = useState<null | number>(null);
  const [refOnChange] = useState({current: onChange});
  refOnChange.current = onChange;

  useEffect(() => {
    if (timeFrom !== null) {
      const dateStart = Date.now();
      const interval = setInterval(() => {
        const dateNow = Date.now();
        const newTime = timeFrom - Math.floor((dateNow - dateStart) / 1000);
        if (newTime >= 0) {
          refOnChange.current(newTime);
          setTime(newTime);
          if (newTime === 0) {
            setTimeFrom(null);
            clearInterval(interval);
          }
        } else {
          setTime(0);
          setTimeFrom(null);
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timeFrom, refOnChange]);

  return {
    time,
    run: timeFrom !== null,
    onStart: (t: number) => {
      setTime(t);
      setTimeFrom(t);
    },
    onStop: () => {
      setTime(0);
      setTimeFrom(null);
    },
    onPause: () => {
      setTimeFrom(null);
    },
  };
}
