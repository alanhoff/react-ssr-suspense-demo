import React from 'react';
import {useFaker} from './faker-provider';

export function CreditCard() {
  console.log('Rendering CreditCard');
  const [err, cc] = useFaker('/credit_cards');

  if (err) {
    return <p>Error loading credit card: {err.message}</p>;
  }

  return (
    <>
      <h4>Credit Card</h4>
      <ul>
        <li>Company: {cc.type}</li>
        <li>Number: {cc.number}</li>
        <li>Expiration: {cc.expiration}</li>
      </ul>
    </>
  );
}