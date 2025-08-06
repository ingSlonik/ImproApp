
import { useState } from 'react';

import { LangProvider } from './services/language';
import Layout from './components/Layout';
import Generator from './pages/Generator';
import Timer from './pages/Timer';
//import Categories from './pages/Categories';

export default function App() {

  return <LangProvider>
    <Layout />
  </LangProvider>;
}