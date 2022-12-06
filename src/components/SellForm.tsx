import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../services/auth-header'
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8000/";


export const SellForm: React.FC<{}> = () => {
  
  let navigate = useNavigate();
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!(currentUser && currentUser.access)) {
      navigate("/login");
      return;
    }
    }, [navigate])

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [modelo, setModelo] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  
  let handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(valor)
      let config = {
        headers: authHeader(),
      }
      let res = await axios.post(API_URL + "car/api", {
        name: nome,
        valor: valor,
      },
      config
      );
      if (res.status === 200) {
        setNome("");
        setValor("");
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
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                value={nome} 
                placeholder="Nome do carro"
                onChange={(e) => setNome(e.target.value)}
                />
              <Form.Label>Modelo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Modelo do carro"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                />
              <Form.Label>Ano</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ano de fabricação"
                value={anoFabricacao}
                onChange={(e) => setAnoFabricacao(e.target.value)}
                />
              <Form.Label>Valor</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite o valor de venda"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                 />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
    )
}

