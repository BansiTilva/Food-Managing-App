import React from 'react'
import './style.css'
const FavoriteItem = (props) => {
    const {id,image,title,removeFavorites} =props;
    console.log(props,'favorite-items');
  return (
    <div key ={id} className="favorite-item">
        <div>
            <img src={image} alt='image of recipe'/>
        </div>
        <p>{title}</p>
        <button type='button' onClick={removeFavorites}>Remove to Favorites</button>
    </div>
  )
}
export default FavoriteItem;
