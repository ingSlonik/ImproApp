/**
 * @format
 * @flow
 */

import React, {useState} from 'react';

import Layout from './src/components/Layout';

import Generator from './src/pages/Generator';
import Timer from './src/pages/Timer';
import Categories from './src/pages/Categories';

const App: () => React$Node = () => {
  const [page, setPage] = useState('generator');
  return (
    <Layout onChange={setPage}>
      {page === 'generator' && <Generator />}
      {page === 'timer' && <Timer />}
      {page === 'categories' && <Categories />}
    </Layout>
  );
};

export default App;
