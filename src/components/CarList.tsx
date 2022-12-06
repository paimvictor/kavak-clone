import { useEffect, useState } from 'react';
import './CarList.css';
import axios from "axios";
import authHeader from '../services/auth-header';
import AuthService from '../services/auth';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CardGroup, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';


const API_URL = 'http://localhost:8000/';

export const CarList: React.FC<{}> = (props) => {

  let navigate = useNavigate();
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!(currentUser && currentUser.access)) {
      navigate("/login");
      return;
    }
    }, [navigate])

  const [cars, setCars] = useState([]);

  const fetchCars = async (): Promise<any> => {
    try {
      const { data } = await axios.get(API_URL + 'car/api', { headers: authHeader() });
      const cars = data;
      setCars(cars);
      console.log(cars);
    } catch (err: any) {
      const currentUser = AuthService.getCurrentUser();
      if (err.response.status === 401 && currentUser.access) {
        AuthService.refreshAccessToken();
      }
      console.log(err);
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
    <Container>
      <Row xs="1" md="4">
        {getColumnsForRow()}
      </Row>
    </Container>
  );
}