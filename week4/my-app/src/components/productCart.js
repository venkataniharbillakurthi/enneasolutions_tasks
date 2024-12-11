import React from 'react' 
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const ProductCart = (props) => {
    const carts = useSelector(store => store.cart.items);
    const { id, name, price, image, slug } = props.data;
    const dispatch = useDispatch();

    const productQuantity = carts.find(item => item.productId === id)?.quantity || 0;

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: 1
        }));
    };
    

    return (
        <div className='bg-gray-300 p-5 rounded-xl shadow-sm'>
            <Link to={slug}>
                <img src={image} alt='' className='w-full h-80 object-cover shadow-lg bg-white' />
            </Link>
            <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
            <div className='flex justify-between items-center'>
                <p>
                    $<span className='text-2xl font-medium'>{price}</span>
                </p>
                <button
                    className='bg-gray-500 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2 text-white'
                    onClick={handleAddToCart}
                >
                    <img src={iconCart} alt="" className='w-5'/>
                    Add To Cart
                </button>
                <p className=' bg-black text-white text-sm
            w-5 h-5 rounded-full flex justify-center items-cente'>{productQuantity}</p>
            </div>
        </div>
    );
};

export default ProductCart;
