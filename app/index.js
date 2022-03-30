import React, {Suspense} from 'react';
import {Profile} from './profile';
import {useSeed} from './faker-provider';
import {Company} from './company';

export function App() {
  console.log('Rendering App');
  const seed = useSeed();

  return (
    <>
      <h1>Suspense SSR demonstration</h1>
      <p>
        Fake data loaded from FakerAPI. Current seed is <strong>{seed}</strong>.<br />
        You can manipulate the seed by adding <code>?seed=example</code> to the URL.
      </p>
      <Suspense fallback={<p>Loading profile...</p>}>
        <Profile />
      </Suspense>
      <Suspense fallback={<p>Loading company...</p>}>
        <Company />
      </Suspense>
    </>
  )
}