import './App';
import { Canvas } from './Canvas';
import {Overlay} from './Overlay';

function App() {
  return (
    <div className='App'>
      <Overlay />
      <Canvas />
    </div>
  );
}

export default App;