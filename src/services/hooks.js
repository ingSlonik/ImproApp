// @flow
import {useState, useEffect} from 'react';

export function useMounted(): {current: boolean} {
  const [isMounted] = useState({current: true});
  useEffect(() => () => {
    isMounted.current = false;
  });
  return isMounted;
}

export function useInterval<T>(
  run: boolean,
  getValue: number => T,
  timeout: number,
  defaultValue: T,
): T {
  const [time, setTime] = useState(defaultValue);
  const [refGetValue] = useState({current: getValue});
  refGetValue.current = getValue;

  useEffect(() => {
    if (run) {
      const dateStart = Date.now();
      setTime(refGetValue.current(0));
      const interval = setInterval(() => {
        const dateNow = Date.now();
        setTime(refGetValue.current(dateNow - dateStart));
      }, timeout);

      return () => {
        clearInterval(interval);
      };
    }
  }, [run, timeout, refGetValue]);

  return time;
}
