import React, {createContext, Suspense, useContext, useMemo} from 'react';
import axios from 'axios';
import {suspender} from './suspender';

const FakerContext = createContext();

export function FakerProvider({seed, children}) {
  console.log('Rendering FakerProvider');

  const value = useMemo(() => ({
    seed,
    cache: new Map()
  }), [seed]);

  return (
    <FakerContext.Provider value={value}>
      <Suspense fallback={<p>Loading...</p>}>
        {children}
      </Suspense>
    </FakerContext.Provider>
  );
}

export function useSeed() {
  return useContext(FakerContext).seed;
}

export function useFaker(url) {
  const {seed, cache} = useContext(FakerContext);

  if (!cache.has(url)) {
    const promise = axios.get(url, {
      baseURL: 'https://fakerapi.it/api/v1',
      params: {
        _seed: seed,
        _quantity: 1,
      }
    }).then(result => result.data.data[0]);

    cache.set(url, suspender(promise));
  }

  return cache.get(url).read();
}