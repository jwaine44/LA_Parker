import './App.css';
import {Routes, Route} from 'react-router-dom';
import Main from './views/Main';
import CreateSpot from './components/CreateSpot';
import UpdateSpot from './components/UpdateSpot';
import ShowSpot from './views/ShowSpot';
import SearchResultNeighborhood from './views/SearchResultNeighborhood';
import SearchResultZipCode from './views/SearchResultZipCode';

function App() {
  return (
    <div className="App">
      <h1 className='headline'>L.A. Parker</h1>
      <Routes>
        <Route path = '/' element = {<Main />} />
        <Route path = '/create' element = {<CreateSpot />} />
        <Route path = '/edit/:id' element = {<UpdateSpot />} />
        <Route path = '/spots/:id' element = {<ShowSpot />} />
        <Route path = '/spots/neighborhood/:neighborhood' element = {<SearchResultNeighborhood />} />
        <Route path = '/spots/zip/:zipCode' element = {<SearchResultZipCode />} />
      </Routes>
    </div>
  );
}

export default App;
