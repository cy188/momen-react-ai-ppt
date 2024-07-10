import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { AiPptDoc } from './components/AiPptDoc';

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100%', width: '100%' }}>
        <AiPptDoc/>
      </div>
    </BrowserRouter>
  );
}

export default App;
