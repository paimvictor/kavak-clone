import axios from "axios";
import { useState } from "react";
import authHeader from "../services/auth-header";
import AuthService from '../services/auth';
import { CardGroup, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const API_URL = 'http://localhost:8000/';


export const EditCars: React.FC<{}> = () => {
    const [cars, setCars] = useState([]);

    const fetchCars = async (): Promise<any> => {
        try {
            const response = await axios.get(API_URL + "car/api", { headers: authHeader()});
            setCars(response.data);
            return response.data;
        } catch(err: any) {
            const currentUser = AuthService.getCurrentUser();
            if (err.response.status === 401 && currentUser.access) {
                AuthService.refreshAccessToken();
            }
        };
    }

    const getColumnsForRow = () => {
        let items = cars.map((car: any, index) => {
          return (
            <Col>
              <Card key={car.nome}>
                <Card.Body>
                  <Card.Title>{car.nome}</Card.Title>
                  <Card.Text>{car.modelo}</Card.Text>
                  <Card.Text>{car.valor}</Card.Text>
                  <Button variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        });
        return items;
      };
    
      useEffect(() => {
        fetchCars();
      }, []);

    return (
        <div></div>            
    )
}