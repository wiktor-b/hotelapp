'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";


interface FavButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}


const FavButton: React.FC<FavButtonProps> = ({
    listingId,
    currentUser,
}) => {

    const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser});

    return ( <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
        <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -left-[2px]"/>
        <AiFillHeart size= {24} className={ hasFavorited ? 'fill-[#AA3E98]': 'fill-[#e3dfff]/70'}/>
        </div> 
        
        );
}
 
export default FavButton;