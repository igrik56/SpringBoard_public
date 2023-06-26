import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import Cola from './Cola'
import Chips from './Chips'
import Pudding from './Pudding'
import Kolobochek from './Kolobochek'

import './App.css';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path = '/' element={<Home />} />
          <Route exact path = '/Cola' element={<Cola/>} />
          <Route exact path = '/Chips' element ={<Chips />} />
          <Route exact path = '/Pudding' element={<Pudding />} />
          <Route exact path = '/Kolobochek' element={<Kolobochek />} />
          </Routes>      
     </BrowserRouter>
    </div>
  );
}

export default App;
