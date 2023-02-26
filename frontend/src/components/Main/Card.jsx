import React from "react";
import "./Card.css"

const Card=(props)=>{
    // console.log(props);

    return <>
    <div className="recipeCard">

        <div className="image-div" >
            <div>
                <h4>{props.props.author}</h4>
            </div>
                <img onClick={()=>{
                    props.setTrigger(true); 
                    props.setImagesrc(props.props.image)
                    props.setPopTitle(props.props.title)
                    props.setPopInstruction(props.props.direction)
                    props.setPopDescription(props.props.ingredients)
                }} src={`http://localhost:4001/images/${props.props.image}`} alt="recipesImg" />
        </div>
        
    </div>
   
    </>
}

export default Card