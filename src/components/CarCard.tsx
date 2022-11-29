export const CarCard: React.FC<{name: string, model: string, price: number}> = (props) => {
    return <div>
        <h2>{props.name}</h2>
        <p>{props.model}</p>
        <p>R$ {props.price}</p>
    </div> 
}