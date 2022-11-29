import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SellForm: React.FC<{}> = () => {
    return (
        <>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome do carro" />
              <Form.Label>Modelo</Form.Label>
              <Form.Control type="text" placeholder="Modelo do carro" />
              <Form.Label>Ano</Form.Label>
              <Form.Control type="text" placeholder="Ano de fabricação" />
              <Form.Label>Valor</Form.Label>
              <Form.Control type="text" placeholder="Digite o valor de venda" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
    )
}

