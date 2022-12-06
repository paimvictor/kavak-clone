import axios from "axios";
import { useState, useEffect } from "react";
import authHeader from "../services/auth-header";
import AuthService from '../services/auth';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { EditSingleCar } from "./EditSingleCar";

const API_URL = 'http://localhost:8000/';


export const EditCars: React.FC<{}> = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

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

    const onButtonEditCar = async (carId: string) => {
      const response = await axios.get(API_URL + "car/api", {params: {id: carId}, headers: authHeader()});
      const car = response.data[0]
      navigate('/editar/' + car.id)

    }

    const onButtonDeleteCar = async (carId: string) => {
      try {
      await axios.delete(API_URL + "car/api", 
      {params: {id: carId}, headers: authHeader()}
      
      );
      window.location.reload();
    } catch (err) {
        console.log(err);
      }
    };

    const getColumnsForRow = () => {
        let items = cars.map((car: any, index) => {
          return (
            <Col>
              <Card key={car.id}>
                <Card.Body>
                  <Card.Title>{car.nome}</Card.Title>
                  <Card.Text>{car.modelo}</Card.Text>
                  <Card.Text>{car.valor}</Card.Text>
                  <Link 
                    to={"/editar/" + car.id.toString()}
                    state={{car: car}}
                  >
                    <Button variant="primary" onClick={() => onButtonEditCar(car.id)}>Editar</Button>
                  </Link>
                  <Button variant="danger" onClick={() => onButtonDeleteCar(car.id)}>Deletar</Button>
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
      <div>
        <Container>
          <Row xs="1" md="4">
            {getColumnsForRow()}
          </Row>
        </Container>
        <Routes>
          <Route path="/car/:id" element={<EditSingleCar/>} />
        </Routes>
      </div>
    )
}