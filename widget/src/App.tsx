import { RecoilRoot } from 'recoil';
import TryOnWidget from './components/TryOnWidget';
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <TryOnWidget />
    </RecoilRoot>
  );
}

export default App;