import { useEffect, useState } from 'react';
// Service
import { getPokemonDescription } from '../../../service/pokeapi';
// Util
import { calculatePercentage } from '../../../utils/IntUtils';
import { getStatLabel, getMaxStat } from '../../../utils/OtherUtils';
// Components
import ProgressBar from '../../others/ProgressBar/ProgressBar';
// CSS
import './PokeDetails.css';

const PokeDetails = ({pokeData, colorScheme}) => {
    const [pokeDesc, setPokeDesc] = useState('');

  useEffect(() => {
    fetchDescription();
  }, [pokeData]);

  const fetchDescription = async () => {
    try {
      const apiData = await getPokemonDescription(pokeData.id);
      setPokeDesc(apiData);

    } catch (error) {
      console.error("getPokemonDescription: err: " + error);
    }
  }
    console.log(pokeData)
  return (
    <>
    <div className={`content tu-${colorScheme}`}>
      <div className='visual'>

      </div>
      <div className='details'>
        <div className='desc'>
            <h3>DESCRIPTION</h3>
            <p>{pokeDesc}</p>
        </div>
        <div className='char'>
            <h3>CHARACTERISTICS</h3>
            <div className='container'>
              <div className='data'>
                <div>
                  <p>Type(s):</p>
                  {pokeData.types.map(({type}) => {
                    return (
                      <p>{type.name}</p>
                    )
                  })}
                </div>

                <div>
                  <p>Height:</p>
                  <p>{pokeData.height}</p>
                </div>

                <div>
                  <p>Weight:</p>
                  <p>{pokeData.weight}</p>
                </div>
              </div>

              <p>Abilities:</p>
              {pokeData.abilities.map(({ability}) => {
                return (
                  <p className={`c-${colorScheme}`}>- {ability.name}</p>
                )
              })}
            </div>
        </div>
        <div className='stat'>
            <h3>STATISTICS</h3>
            <div className='container'>
              {pokeData.stats.map(({stat, base_stat,}) => {
                return (
                  <div style={{'marginTop':'0.5rem'}}>
                    <span style={{'width':'10%'}}>
                      {getStatLabel(stat.name)}
                    </span> 
                    
                    <ProgressBar percentage={calculatePercentage(base_stat, getMaxStat(stat.name))} color={`bg-${colorScheme}`}/>

                    <span style={{'width':'10%', 'textAlign':'center'}}>
                      {base_stat}
                    </span>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PokeDetails;
