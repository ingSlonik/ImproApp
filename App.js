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

/*
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
*/

export default App;
