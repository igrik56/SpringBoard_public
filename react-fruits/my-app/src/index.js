import fruits from "./fruits";
import { rand, remover } from "./helpers";


let fruit = rand(fruits)

console.log(`I'd like one ${fruit}, please`)
console.log(`Here you go: ${fruit}`)
console.log(`Delicious! May I have another?`)

let leftovers = remover(fruits, fruit)
console.log(`I’m sorry, we’re all out. We have ${leftovers.length} left.`)