import './App.css'
import {useState,useEffect} from "react"
import SingleCard from "./components/SingleCard"
const cardImages=[
  
  {"src":"/img/helmet-1.png",match:false},
  {"src":"/img/potion-1.png",match:false},
  {"src":"/img/ring-1.png", match:false},
  {"src":"/img/scroll-1.png", match:false},
  {"src":"/img/shield-1.png", match:false},
  {"src":"/img/sword-1.png", match:false}
]


function App() {
  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [firstChoice,setFirstChoice]=useState(null);
  const [secondChoice,setSecondChoice]=useState(null);
  const [disabled,setDisabled]=useState(false);

  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
           .sort( () => .5 - Math.random() )
           .map((card)=>({...card,id:Math.random()}))
    setCards(shuffledCards);

    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
  }
  // console.log(cards,turns);
  const handleChoice=(card)=>{
    // console.log(card);
    firstChoice? setSecondChoice(card):setFirstChoice(card)
  }
  const reset=()=>{
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns=>prevTurns+1);
    setDisabled(false);
  }

  //compare 2 choices
  useEffect(()=>{
    if(firstChoice && secondChoice){
      setDisabled(true);
      if(firstChoice.src==secondChoice.src){
        console.log("match found");
        setCards((prevCards)=>{
          return prevCards.map((cards)=>{
            if(cards.src==firstChoice.src){
              return {...cards,match:true};
            }else {
              return cards;
            }
          })
        })
        reset();
      }
      else {console.log("not found");setTimeout(()=>reset(),1000);}
    }
  },[firstChoice,secondChoice])
  console.log(cards);
  //start game automatically
  useEffect(()=>{
    shuffleCards();

  },[])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map((card)=>(
            <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card==firstChoice || card==secondChoice || card.match} disabled={disabled}
            />
          ))
        }
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App