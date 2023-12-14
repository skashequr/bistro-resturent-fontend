import useCart from "../../hooks/useCart";


const Card = () => {
    const [cart] = useCart();
    console.log(cart);
    return (
        <div>
            <h3 className="text-6xl">Total Items {cart?.length}</h3>
            <div className="overflow-x-auto">
  
</div>
        </div>
    );
};

export default Card;