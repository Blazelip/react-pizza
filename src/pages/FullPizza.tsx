import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [ pizza, setPizza ] = React.useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const response = await axios.get(`https://62c2edd6ff594c656769c94f.mockapi.io/pizzas/${id}`);
        setPizza(response.data);
      } catch (error) {
        navigate('/'); 
      }
    }
    fetchPizza();
  }, [])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{ pizza.title }</h2>
      <h4>{ pizza.price }</h4>
    </div>
  )
}

export default FullPizza