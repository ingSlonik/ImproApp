// @flow
import {useState, useEffect} from 'react';

export default function useMounted(): {current: boolean} {
  const [isMounted] = useState({current: true});
  useEffect(() => () => {
    isMounted.current = false;
  });
  return isMounted;
}
