// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

import React, {useState} from 'react';
import Products from './components/Products';
import Payments from './components/Payments';
import DateTimeNow from "./components/DateTimeNow";

const App = () => {
const [totalPrice, setTotalPrice] = useState(0);
const [dateTime, setDateTime] = useState(new Date());

  return (
      <div>
        <DateTimeNow dateTime={dateTime} setDateTime={setDateTime}></DateTimeNow>
        <Products setTotalPrice={setTotalPrice} />
        <Payments totalPrice ={totalPrice} dateTime={dateTime}  />
      </div>
  );
};

export default App;