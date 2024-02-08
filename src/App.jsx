
import { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Result.jsx"
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState("");

  const changeSearchHandler = (event)=>{
    setSearch(event.target.value)
  }

  const getAllmovies = ()=>{
    axios.get(APIURL)
    .then(
      (response)=>{
        console.log(response.data.results)
        setMovies(response.data.results);
      }

    )
    .catch(
      (error)=>{
          console.log(error)
      }
    )
  }

  const getSearchedMovies =() =>{
    axios.get(
      SEARCHAPI+search
    )
    .then(
      (response)=>{
        console.log(response.data.results)
        setMovies(response.data.results);
      }

    )
    .catch(
      (error)=>{
          console.log(error)
      }
    )
    
  }
  useEffect(()=>{
    setMovies([]);
    if(search === ''){
      getAllmovies();
      
    }else{
      getSearchedMovies();
    }
  },
  [search]
  )


  return (
    <div className='max-w-[1240px] min-h[400px] mx-auto p-3 shadow-xl '>
      
       
     <input type="search"
     value={search} onChange={changeSearchHandler} 
     className='w-full border border-black rounded p-4 text-slate-900 '
      />
     
     
     {
        movies.length === 0
          ?
          <div className="text-3xl text-center mt-2"> Loading... </div>
          :
          <Result movies={movies} />

      }
    </div>
  );
}

export default App;
