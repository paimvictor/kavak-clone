export const CarCard: React.FC<{name: string}> = (props) => {
    return <div>
        <h2>{props.name}</h2>
        <p>2001 - 105km - Sao Paulo</p>
        <p>R$ 5.000</p>
    </div>
}