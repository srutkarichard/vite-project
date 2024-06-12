import { useState } from 'react'
import axios from 'axios'
import './App.css'
import List from './List.jsx'
import pokemonStats from "./pokemonStat.json"

function Pokemon(id, url) {
  this.id = id;
  this.url = url;
}
var cardSrc
function typeSort(props){
  cardSrc = `./src/img/cardBackground/${props}.png`
  return cardSrc
}

const downloadObjectAsJson = (exportObj, exportName) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); 
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

function PokemonList({ pokemonStats, onClick }) {
  const pokemonFav = favList;
  const kart = pokemonStats.map(pokemon =>  
    { 
      var indx
      var cardUrl
      if(favList.some(obj => obj.id === pokemon.pokedexNumber)) {
         cardUrl = favList[favList.findIndex(obj => obj.id === pokemon.pokedexNumber)].url
         indx = 0
      } else {
        cardUrl=typeSort(pokemon.type1)
         indx = 2
      }
    
      return (
        <div >
          <p className='pokemonName' style={{zIndex : indx}}><b>{pokemon.pokemonName}</b></p>
          <img className='pokemonSprite' src={`./src/img/pokemonSprites/${pokemon.pokedexNumber}.png`} onClick={() => onClick(pokemon.pokedexNumber)} style={{zIndex : indx}}/>
          <img className="pokemonKarty2" src={cardUrl} alt="nejde"  onClick={() => onClick(pokemon.pokedexNumber)} />
        </div>
      )
    }
  )
  return (
    <div >
      <button onClick={() => downloadObjectAsJson(favList, "pokemon")}>EXPORT LIST</button>
      <div className='home'>{kart}</div>
      
    </div>
  );
} 

const favList = []
function addToFav(props){
  const isDupe = favList.some(obj => obj.id === props.id)
  if(isDupe) {
    const index = favList.findIndex(obj => obj.id === props.id);
    favList.splice(index,1)
  }
  favList.push(props)
}


function App() {
  const [count, setCount] = useState(0)
  const [listKaret, setListKaret] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [renderType, setRenderType] = useState('pokemonList');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getData = (props) => {
    setRenderType('loading')                                                 
    axios.get("https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:"+ props+"&select=id,name,images,nationalPokedexNumbers")
    .then(response => {
      
      setListKaret(response.data.data);
      setRenderType('cardList')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div>
        {renderType === 'pokemonList' ? (
          <PokemonList pokemonStats={pokemonStats} onClick={getData} />
        ) :renderType==="loading" ? (
          <div><p>LOADING</p></div>
        ) : (
          <div>
            <div>
              <button className="floatingButton" onClick={() => {setRenderType('pokemonList'),PokemonList({pokemonStats})}} >X</button>
              <List items={listKaret} fun={addToFav}></List>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
