import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContex); // Fix the typo here
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    });
    return [cart, refetch];
}

export default useCart;