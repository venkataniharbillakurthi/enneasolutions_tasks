import React from 'react'
import { products } from '../products'
import ProductCart from '../components/productCart'
import styled from 'styled-components'

const H2 = styled.h2`
  font-size: 1.875rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`;

const Home = () => {
  return (
    <div>
        <H2 >List Products</H2>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
            {products.map((product, key) => 
                <ProductCart key={key} data={product}/>
            )}
        </div>
    </div>
  )
}

export default Home