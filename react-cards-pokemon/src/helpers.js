import {v4 as uuid} from 'uuid'

/* Select a random element from values array. */
function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

function formatCard(data){
  return{
    image: data.cards[0].image,
    id: uuid()
  }
}

function formatPokemon(data){
  return{
    id: uuid(),
    front: data.sprites.front_default,
    back: data.sprites.back_default,
    name: data.name,
    stats: data.stats.map(stat => ({
      values: stat.base_stat,
      name: stat.stat.name
    }))
  }
}

export { choice, formatCard, formatPokemon };