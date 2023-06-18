import { useEffect, useState } from 'react';

export function useWindowDimension() {
  const [windowDimension, setWindowDimension] = useState([window.innerWidth, window.innerHeight]);

  function onWindowResize() {
    setWindowDimension([window.innerWidth, window.innerHeight]);
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
  }, []);

  return {
    width: windowDimension[0],
    height: windowDimension[1],
  };
}
