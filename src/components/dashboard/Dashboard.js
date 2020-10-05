import React from 'react';

import Header from './home';
import Risk from './risk';
import List from './list';
import Visual from './visual';

export default function Dashboard() {
  return (
    <div>
      <Header />

      <Risk />
      <List />
      <Visual />
    </div>
  );
}
