
import { LangProvider } from './services/language';
import Layout from './components/Layout';

export default function App() {

  return <LangProvider>
    <Layout />
  </LangProvider>;
}