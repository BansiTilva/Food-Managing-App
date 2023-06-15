import React, { useEffect, useState } from 'react'
import './style.css';


const Search = (props) => {
    console.log(props)
    const { getData ,apiCalledSuccess,setApiCalledSuccess} = props;
    const [inputValue, setInputValue] = useState('')

    const handleInputvalue = (event) => {
        const { value } = event.target;
        setInputValue(value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        getData(inputValue);
    }

    useEffect(()=>{
         if(apiCalledSuccess){
            setInputValue('');
            setApiCalledSuccess(false);
         }
    },[apiCalledSuccess])

    return (
        <form onSubmit={handleSubmit} className='search'>
            <input name='search' id='search' onChange={handleInputvalue} value={inputValue} placeholder='Search Recipes'></input>
            <button type='submit' >Search</button>
            
           
        </form>
    )
}
export default Search;