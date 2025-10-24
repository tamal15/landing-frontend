import PropTypes from 'prop-types'; // Import PropTypes

const CartOrder = ({ cart }) => {
    return (
        <div>
            {cart?.map((single) => (
                <div key={single._id} className="pb-3">
                    <div className="p-4 max-w-md mx-auto shadow-lg rounded-lg">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4">
                                <img
                                    className="object-cover h-48 w-full rounded"
                                    src={single?.images}
                                    alt="Product"
                                />
                            </div>
                            <div className="col-span-8">
                                <h2 className="text-lg font-bold">Types: {single?.title}</h2>
                                <p className="font-semibold">Price: {single?.ProductPrice}</p>
                                <p className="font-semibold">Quantity: {single?.quantity}</p>
                                <p className="font-semibold">Size: {single?.selectedSize}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ✅ Add PropTypes validation
CartOrder.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            img: PropTypes.string,
            types: PropTypes.string,
            ProductPrice: PropTypes.number,
            quantity: PropTypes.number,
            selectedSize: PropTypes.string,
        })
    ).isRequired,
};

export default CartOrder;
