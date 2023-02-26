import React, { useEffect, useState } from "react";
import logo from "./../image/logo.png"
import "./Main.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import jsonData from "./data.json"
import Card from "./Card";
import Popup from "./Popup";
import "./Popup.css"


const Main = ()=>{
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [allRecipe, setAllRecipe] = useState([])

    // POP UP IMAGE SETTING================================
    const [imagePopup, setImagePopup] = useState(false)
    const [imagesrc, setImagesrc] = useState("")
    const [popTitle, setPopTitle] = useState("")
    const [popInstruction, setPopInstruction] = useState()
    const [popDescription, setPopDescription] = useState("")
    const [showInstruciton, setShowInstruction] = useState(true)
    //=====================================================

    const userid = JSON.parse(localStorage.getItem("userdetails"))._id
    console.log(userid);

    useEffect(()=>{
        fetchAllRecipe()
    }, [])

    const fetchAllRecipe=async()=>{
        let data = await axios.get(`http://localhost:4001/allRecipe/${userid}`)
        // console.log(data);
        setAllRecipe(data.data.AllRecipe)
    }

    useEffect(()=>{
        fetchSearchedRecipe()
    }, [search])

    const fetchSearchedRecipe =async()=>{
        let data = await fetch(`http://localhost:4001/allRecipe/${userid}/${search}`)
                            .then(data=>data.json())
                            .then(data=>{
                                setAllRecipe(data.AllRecipe)
                            })
                // console.log( await data.json());
    }

    return <>
    <div className="main">
        <div className="header">
            <div className="logo-section">
                <img className="logo" src={logo} alt="logo" />
                <h1>RECIPE APP</h1> 
            </div>
            <div><button onClick={()=>navigate("/")}>Logout</button></div>
        </div>
            <hr></hr>

        {/* SEARCH BAR BUTTON AND  */}

        <div className="search-new-btn">
            <div className="search-bar-div">
                <input className="search-bar" placeholder="Search by Title" type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <div className="new-btn-div">
                <Link to="RecipeForm">
                    <button className="new-btn" >New</button>
                </Link>
            </div>
        </div>
        <hr></hr>

        {/* ALL RECIPE */}     
          
        <div>
            <h2>All Recipe</h2>
            <div >
                {allRecipe.map((data, key)=>{
                    return <>                           
                        <Card 
                            // index={key}
                            id={key}
                            props={data} 
                            setPopInstruction={setPopInstruction}
                            setPopDescription={setPopDescription}
                            setTrigger={setImagePopup} 
                            setImagesrc={setImagesrc} 
                            setPopTitle={setPopTitle} 
                        />            
                    </>
                })}
            </div>
        </div>

        {/* POPPED IMAGE CONFIGURATION */}

        <Popup trigger={imagePopup} setTrigger={setImagePopup}>
            <div className="main-pop-div">
                <div className="pop-image-div">
                    <h4>{popTitle}</h4> 
                        <img src={`http://localhost:4001/images/${imagesrc}`} alt="poped image"/>    
                </div>
                <div className="pop-button-div">
                    <div>
                        <div><button onClick={()=>{setShowInstruction(true)}}>Instructions</button></div>
                        <div><button onClick={()=>{setShowInstruction(false)}}>Ingredients</button></div>
                    </div>
                    <div className="showContent">
                        {showInstruciton ? <div>{popInstruction}</div> : <div>{popDescription}</div>}
                    </div> 
                </div>
            </div>
        </Popup>

        {/* ======================================================= */}

    </div> 
    </>
}

export default Main