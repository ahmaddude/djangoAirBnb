'use client';

import apiService from "../services/apiService";

interface FavoriteButtonProps{
    id:string;
    is_favorite: boolean;
    markFavorite:(is_favorite:boolean)=> void;
}

const FavoriteButton:React.FC<FavoriteButtonProps>=({
    id,
    is_favorite,
    markFavorite
})=>{
    const toggleFavorite=async(e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        const response =await apiService.post(`/api/properties/${id}/toggle_favorite/`,{})

        markFavorite(response.is_favorite);
    }
    return(
        <div onClick={toggleFavorite}
        className={`absolute top-2 right-2 ${is_favorite? 'text-airbnb' : 'text-white'} hover:text-airbnb `}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='none' stroke="currentColor" strokeWidth='2'>
                <path  d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"/>
            </svg>
        </div>
    )
}
export default FavoriteButton;