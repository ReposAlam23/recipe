import React, { useEffect, useState } from "react";
import logo from "./../image/logo.png"
import "./Main.css"
import axios from "axios";
import { Link } from "react-router-dom";

const Main = ()=>{
    const [search, setSearch] = useState("")
    const [allRecipe, setAllRecipe] = useState([])

    useEffect(()=>{
        fetchAllRecipe()
    }, [])

    const fetchAllRecipe=async()=>{
        let data = await axios.get("http://localhost:4001/allRecipe")
        // console.log(data.data.AllRecipe);
        setAllRecipe(data.data.AllRecipe)
        console.log(allRecipe);
    }

    // const fetchImage=async(imageName)=>{
    //     let 
    // }

    return <>
    <div className="main">
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
            <h1>RECIPE APP</h1> 
        </div>
            <hr></hr>

        {/* SEARCH BAR BUTTON AND  */}

        <div className="search-new-btn">
            <div className="search-bar">
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <div className="new-btn">

                <Link to="RecipeForm">
                    <button >New</button>
                </Link>
            </div>
        </div>
            <hr></hr>

        {/* ALL RECIPE */}
         
        <div>
            <h2>All Recipe</h2>
            {allRecipe.map((data, key)=>{
                return <>
                    <img src={`http://localhost:4001/images/${data.image}')`} alt="recipeImg" />
                    <p>{data.author}</p>    
                </>
            })}

        </div>

    </div>
        
    
    </>
}

export default Main