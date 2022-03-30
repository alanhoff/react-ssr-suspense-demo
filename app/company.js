import React from 'react';
import {useFaker} from './faker-provider';

export function Company() {
  console.log('Rendering Company');
  const [err, company] = useFaker('/companies');

  if (err) {
    return <p>Error loading company: {err.message}</p>;
  }

  return (
    <>
      <h3>Works at</h3>
      <ul>
        <li>Company: {company.name}</li>
        <li>Country: {company.country}</li>
        <li>Website: <a href="#">{company.website}</a></li>
      </ul>
    </>
  );
}