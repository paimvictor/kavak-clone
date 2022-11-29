import { CarCard } from './CarCard';
import './CarList.css';

export const CarList: React.FC<{}> = (props) => {
    const cars = [
        {id: 1, name: 'Jeep', model: '2018', price:1000.0},
        {id: 2, name: 'Polo', model: '2018', price:1000.0},
        {id: 3, name: 'Golf GTI Tunado', model: '2018', price:1000.0},
      ]
    
      return (
        <div className="CarList">
          {cars.map( (car) => {
            console.log(car)
            return <CarCard key={car.id} name={car.name} model={car.model} price={car.price}/>
          })}
        </div>
      );
}