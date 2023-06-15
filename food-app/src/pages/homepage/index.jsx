import React, { useEffect, useReducer, useState } from 'react'
import Search from '../../components/search';
import RecipeItem from '../../components/recipe-item';
import FavoriteItem from '../../components/favorite-item';
import './style.css';

const dummydata = 'dummydata';
const reducer = (state, action) => {
    switch (action.type) {
        case 'filterFavorites':
            console.log(action);
            return {
                ...state,
                filteredValue: action.value
            }
        default:
            return state
    }
}
const initialState = {
    filteredValue: ''
}
const HomePage = () => {
    //loading state
    const [loadingState, setLoadingState] = useState(false)
    //save results that we receive from api
    const [recipes, setRecipes] = useState([])

    const [favorites, setFavorites] = useState([])
    const [apiCalledSuccess, setApiCalledSuccess] = useState(false)
    const [filteredState, dispatch] = useReducer(reducer, initialState)
    const getData = (getData) => {
        //keep the loading stae as true before we are calling the api
        setLoadingState(true)


        console.log(getData, 'getData');
        //calling api
        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e784bd1a170247f5af9d9040c9dd077b&query=${getData} `)
            const result = await apiResponse.json()
            const { results } = result;
            if (results && results.length > 0) {
                setLoadingState(false);
                setRecipes(results);
                setApiCalledSuccess(true);
            }

            console.log(result);
        }
        getRecipes()
    };

    console.log(loadingState, recipes, 'loadingstate', 'recipes');

    const addToFavorites = (getCurrentRecipeItem) => {
        console.log(getCurrentRecipeItem);
        let cpyFavorites = [...favorites];

        const index = cpyFavorites.findIndex(item => item.id === getCurrentRecipeItem)
        console.log(index);
        if (index === -1) {
            cpyFavorites.push(getCurrentRecipeItem)
            setFavorites(cpyFavorites)
            localStorage.setItem('favorites', JSON.stringify(cpyFavorites))
            window.scrollTo({ top: '0', behavior: 'smooth' })
        }
        else {
            alert('Item is already present in favorites')
        }
    };
    const removeFavorites = (getCurrentId) => {
        let cpyFavorites = [...favorites];
        cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);
        setFavorites(cpyFavorites);
        localStorage.setItem('favorites', JSON.stringify(cpyFavorites));
    }


    useEffect(() => {
        console.log('');
        const extractFavorites = JSON.parse(localStorage.getItem('favorites'))
        setFavorites(extractFavorites)
    }, [])
    console.log(filteredState, 'filteredState');
    const filterFavoritesItems = favorites.filter((item) =>
        item.title.toLowerCase().includes(filteredState.filteredValue))

    return (
        <div className='homepage'>
            <Search getData={getData}
                dummydata={dummydata}
                apiCalledSuccess={apiCalledSuccess}
                setApiCalledSuccess={setApiCalledSuccess} />

            <div className="favorites-wrapper">
                <h1 className='favorites-title'>Favorites</h1>

                <div className="search-favorites">
                    <input
                        onChange={(event) => dispatch({ type: 'filterFavorites', value: event.target.value })}
                        value={filteredState.filteredValue}
                        name='searchfavorites' placeholder='Search Favorites' />
                </div>
                <div className="favorites">
                    {
                        !filterFavoritesItems.length && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className="no-items">No favorites are found</div>
                    }
                    {
                        filterFavoritesItems && filterFavoritesItems.length > 0 ?
                            filterFavoritesItems.map((item) => (
                                <FavoriteItem
                                    removeFavorites={() => removeFavorites(item.id)}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                />
                            ))
                            : null
                    }
                </div>


            </div>
            {
                loadingState && (<div className='loading'>Loading Recipe Item.....</div>)
            }
            <div className="items">
                {
                    recipes && recipes.length > 0
                        ? recipes.map((item) => (<RecipeItem
                            addToFavorites={() => addToFavorites(item)}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                        />
                        ))
                        : null
                }
            </div>
            {
                !loadingState && !recipes.length && <div className='no-items'>No Recipes are found</div>
            }


        </div>
    )
}
export default HomePage;