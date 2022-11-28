import React from 'react';
import './App.css';
import { CarCard } from './components/CarCard';

function App() {
  const cars = [
    {id: 1, name: 'Jeep'},
    {id: 2, name: 'Polo'},
    {id: 3, name: 'Golf GTI Tunado'},
  ]

  return (
    <div className="App">
      {cars.map( (car) => {
        console.log(car)
        return <CarCard key={car.id} name={car.name}/>
      })}
    </div>
  );
}

export default App;
