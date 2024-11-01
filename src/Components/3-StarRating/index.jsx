
import { useState } from "react"
import { FaStar } from "react-icons/fa"

export function StarRatingComponent({noOfStars}){

    const [clickedStars, setClickedStars] = useState(0)
    const [hoveredStars, setHoveredStars] = useState(0)

    function handleClick(index){
        setClickedStars(index)
    }
    
    function handleHover(index){
        setHoveredStars(index)
    }
    
    function handleMouseleave(){
        setHoveredStars(0)
    }

    return <div className="stars flex justify-center pt-12 bg-slate-900 h-svh">

    {[...Array(noOfStars)].map((_,index) => {
        index +=1;

        return <div className="star">
            <FaStar
            key={index}
            size={60}
            // here comparing with the hovered stars is at priority
            color={(index <= (hoveredStars || clickedStars) ?"yellow" : "white")}       //compares the index of the star to the hoveredStar state first, and if it's 0, then compares it with the clicked stars
            onClick={()=>handleClick(index)}
            onMouseEnter={()=>handleHover(index)}
            onMouseLeave={()=>handleMouseleave()}
            />
        </div>
    })}

    </div>

}