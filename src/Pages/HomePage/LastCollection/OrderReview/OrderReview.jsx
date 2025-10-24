import  { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartCalculation from '../../../Hooks/UseCartCalculation';
import { CartContext } from '../../../Shared/Context/CartContext';
import ScrollToTop from '../../../ScrollToTop/ScrollToTop';

const OrderReview = (props) => {
    // const [date, setDate] = useState('');
    const { shipping, tax, totalQuantity, total, grandtotal, totalIncome, model } = CartCalculation();
    const [cart, setCart] = useContext(CartContext);
    let navigate = useNavigate();

    const handleRemoveToCart = (productToRemove) => {
        const updatedCart = cart.filter(product => 
            product.types !== productToRemove.types ||
            product.ProductPrice !== productToRemove.ProductPrice ||
            product.shipping !== productToRemove.shipping ||
            product.productimg !== productToRemove.productimg
        );
    
        if (updatedCart.length === 0) {
            // If cart is empty, remove all stored data
            localStorage.removeItem("productCart");
            localStorage.removeItem("shippingCost");
            localStorage.removeItem("shippingOption");
        } else {
            // Otherwise, just update the cart data
            localStorage.setItem("productCart", JSON.stringify(updatedCart));
        }
    
        setCart(updatedCart);
    };
    
    

    const handlePaymentGoToPage = () => navigate('/payment');

    return (
        <div>
            <div className="container mx-auto p-4 mt-40 mb-10">
                <ScrollToTop/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mt-3">
                        {cart.map((cartItem, index) => (
                            <div key={`${cartItem.types}-${index}`} className="p-4 shadow-lg rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <img className="object-cover w-full h-48 rounded-lg" src={cartItem?.images} alt="product" />
                                    <div className="text-left">
                                        <p className="font-bold">Types: {cartItem?.title}</p>
                                        <p className="font-semibold text-lg">Size: {cartItem?.selectedSize}</p>
                                        <p className="font-semibold">Price: {cartItem?.ProductPrice}</p>
                                        <p className="font-semibold">Quantity: {cartItem?.quantity}</p>
                                        <button onClick={() => handleRemoveToCart(cartItem)} className="bg-green-800 text-white px-4 py-2 rounded mt-2">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="p-4 shadow-lg rounded-lg">
                            <h5 className="text-xl font-bold mb-2">Order Summary</h5>
                            <hr />
                            <p className="font-medium">Total Quantity: {totalQuantity}</p>
                            <p className="font-medium">Total: {total.toFixed(2)} Taka</p>
                            <p className="font-medium">Shipping: {shipping.toFixed(2)} Taka</p>
                            <p className="font-medium">Tax: {tax.toFixed(2)} Taka</p>
                            <hr />
                            <p className="font-medium">Grand Total: {grandtotal.toFixed(2)} Taka</p>
                            {/* <p className="font-medium">Total Income: {totalIncome.toFixed(2)} Taka</p> */}
                            {/* <p className="font-medium">Discount Total: {model} Taka</p> */}
                            <div>{props.children}</div>
                            <button onClick={handlePaymentGoToPage} className="bg-green-800 text-white w-full py-2 rounded mt-4">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderReview.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderReview;