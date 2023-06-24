import { useEffect, useState } from "react";
// Component
import BouncingPokeball from "./BouncingPokeball/BouncingPokeball";
// API
import { getPokemonData } from "../service/pokeapi.js";
// Utils
import { removeHyphenAndCapitalize } from "../utils/StringUtils.js";
// CSS
import './PokeCard.css';

const PokeCard = (props) => {
  const { name } = props;
  const [pokeData, setPokeData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
        setLoading(true);

        const apiData = await getPokemonData(name);
        setPokeData(apiData);

        setTimeout(function() {
          setLoading(false);

          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 600);
        }, 3000);

    } catch (error) {
        console.log("fetchPokemonData: err: " + error);
    }
  }

  const setFlash = () => isVisible && "flash";
  const getBackgroundColor = () => pokeData ? pokeData?.color : 'default';
  const getPokemonHeight = (height) => height + 350;
  const getPokemonImage = () => {
    return pokeData?.artwork.default.front;
  }

  return (
    <>
    <div key={pokeData?.id} className={`card bg-${getBackgroundColor()} ${setFlash()}`}>
      { !loading ? (
          <>
            <p className="id">{`#${pokeData?.id}`}</p>
            <p className="name-en">{removeHyphenAndCapitalize(name)}</p>
            <img 
              src={getPokemonImage()} 
              alt={`${pokeData?.id}-${pokeData?.name.en}-sprite`} 
              style={{height: getPokemonHeight(pokeData?.height)}}
            />
            <p className="name-jp">{pokeData?.name.jp}</p>
          </>
      ) : (
        <BouncingPokeball />
      )}
      </div>
    </>
  );
}

export default PokeCard;