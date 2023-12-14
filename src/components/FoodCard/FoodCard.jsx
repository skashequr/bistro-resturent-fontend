import { useContext } from "react";
import { AuthContex } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import axios from "axios";
import Swal from 'sweetalert2'
import useCart from "../../hooks/useCart";




const FoodCard = ({item}) => {
    const {_id,name, image, price, recipe} = item;
    const {user} = useContext(AuthContex);
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart();
    // console.log(user);
    const handleBooking = (_id) =>{
    //         // console.log(_id);
            const cartItems = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }
            axiosSecure.post('/carts',cartItems)
            .then(res=>{
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Add has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                refetch();
            })
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={ ()=> handleBooking({_id})} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;