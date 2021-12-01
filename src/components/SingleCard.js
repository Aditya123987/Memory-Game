import "./SingleCard.css"
export default function SingleCard({card,handleChoice,flipped,disabled}) {
  const handleClick=()=>{
    if(!disabled && !flipped)
    handleChoice(card);
  }
    return (
            
            <div className="card" >
              <div className={flipped?"flipped":""}>
                
                <img src={card.src} alt="front" className="front"/>  
                <img src="/img/cover.png" alt="back" className="back" onClick={handleClick}/>
              </div>  
            </div>
    )
}
