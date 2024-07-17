import "./Tile.css";
import {useEffect} from "react";


function Tile(props) {

  useEffect(() => {
    if (props.newGame) {
      document.getElementById(props.id).classList.add("invisible");
      document.getElementById("tile-" + props.id).classList.remove("paired");
    }
  }, [props.newGame, props.id]);

  function handleClick() {
    console.log("Pairs: " + props.pairList.toString());
    if (props.pairList.findIndex(letter => letter === props.letter) === -1) {
      if (document.getElementById(props.id).classList.contains("invisible")) {
        //if the letter was invisible...
      
        if (!props.isMax) { //if there is still room to see a letter
          props.counterInc();
          props.addReveal(props.letter);
          document.getElementById(props.id).classList.toggle("invisible");
        }
      } else {
        props.counterDec();
        props.removeReveal(props.letter);
        document.getElementById(props.id).classList.toggle("invisible")
      }
    } else {
      console.log("Already paired");
    }
    //console.log("counter: " + props.counter);
  }

  if (props.pairList.findIndex(letter => letter === props.letter) !== -1) {
    document.getElementById("tile-" + props.id).classList.add("paired"); 
  }
  
  return (
    <div id={"tile-" + props.id} className="tile" onClick={handleClick}>
      <h2 id={props.id} className="invisible">{props.letter}</h2>
    </div>
  );
}

export default Tile;