import React, {Suspense} from 'react';
import {useFaker} from './faker-provider';
import {CreditCard} from './credit-card';

export function Profile() {
  console.log('Rendering Profile');
  const [err, person] = useFaker('/persons');

  if (err) {
    return <p>Error loading profile: {err.message}</p>;
  }

  return (
    <>
      <h3>Profile</h3>
      <ul>
        <li>Name: {person.firstname} {person.lastname}</li>
        <li>Email: <a href="#">{person.email}</a></li>
        <li>Phone: {person.phone}</li>
        <li style={{listStyleType: 'none'}}>
          <Suspense fallback={<p>Loading credit card...</p>}>
            <CreditCard />
          </Suspense>
        </li>
      </ul>
    </>
  );
}