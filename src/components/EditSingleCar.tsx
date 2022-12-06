import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import authHeader from "../services/auth-header";
import AuthService from '../services/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const API_URL = "http://localhost:8000/";

export const EditSingleCar: React.FC<{}> = () => {

  const [car, setCar] = useState({nome: "", modelo: "", valor: "", ano: ""});
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [valor, setValor] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const params = useParams();

  useEffect(() => {
    axios.get(API_URL + "car/api", {params: {"id": params.id}, headers: authHeader()})
      .then(response => {
        setCar(response.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.id])

  useEffect(() => {
    setNome(car.nome);
    setValor(car.valor);
    setModelo(car.modelo);
    
  }, [car])

  let handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let config ={ 
        headers: authHeader(),
      }
      const response = await axios.patch(API_URL + "car/api", {
        id: params.id,
        nome: nome,
        modelo: modelo,
        valor: valor,
        ano: anoFabricacao,
      },
      config
      );
      if (response.status === 200) {
        console.log("SUCESSO")
    } else {
      console.log("ERROR")
    }
  } catch (err: any) {
      const currentUser = AuthService.getCurrentUser();
      if (err.response.status === 401 && currentUser.access) {
        const newAccessToken = AuthService.refreshAccessToken();
        console.log(newAccessToken);
      }
      console.error(err);
  }
  };
  

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>  
          <Form.Control
            type="text"
            value={nome}
            placeholder={nome}
            onChange={(e: any) => setNome(e.target.value)}
            />
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            value={modelo}
            placeholder={modelo}
            onChange={(e: any) => setModelo(e.target.value)}
            />
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="text"
            value={anoFabricacao}
            placeholder={anoFabricacao}
            onChange={(e: any) => setAnoFabricacao(e.target.value)}
            />
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="text"
            value={valor}
            placeholder={valor}
            onChange={(e: any) => setValor(e.target.value)}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
          Atualizar Dados
        </Button>
      </Form>
    </div>
  )
}