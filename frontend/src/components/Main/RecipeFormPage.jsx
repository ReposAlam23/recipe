import React, { useState } from "react";
import "./RecipeFormPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeForm =()=>{
    const navigate = useNavigate()
    // const [recipeForm, setRecipeForm] = useState({ title: "", author: "", image: "", ingredients: "", direction: ""})
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [direction, setDirection] = useState("")
    const submitHandler= async(e)=>{
        e.preventDefault()
        // console.log(recipeForm);

        const formdata = new FormData()
        formdata.append("title", title)
        formdata.append("author", author)
        formdata.append("image", image)
        formdata.append("ingredients", ingredients)
        formdata.append("direction", direction)

        await fetch("http://localhost:4001/addRecipe", {
            method: "POST",
            body: formdata
        })
        navigate("/Home")    
    }

    return <>
    <div className="recipe-page">
        <div className="recipe-form">
            <h1>Create a recipe</h1>
            <p className="title">Share a recipe with the club by completing <br></br>the form below</p>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <div>
                            <label htmlFor="title">Recipe title</label>
                        </div>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="author">Author</label>
                        </div>
                        <input 
                            type="text" 
                            id="author"
                            name="author"
                            value={author} 
                            onChange={(e)=> setAuthor(e.target.value)} 
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="image">Please uploade your image</label>
                        </div>
                        <input 
                            type="file" 
                            id="image"
                            name="image"
                            value={image} 
                            onChange={(e)=>setImage(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="ingredients">Ingredients</label>
                        </div>
                        <input 
                            type="text" 
                            id="ingredients"
                            name="ingredients"
                            value={ingredients} 
                            onChange={(e)=>setIngredients(e.target.value)}                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="direction">Direction</label>
                        </div>
                        <input 
                            type="text" 
                            id="direction"
                            name="direction"
                            value={direction} 
                            onChange={(e)=>setDirection(e.target.value)}                        />
                    </div>
                    <button type="submit">Add recipe</button>

                </form>
            </div>
        </div>
    </div>
    
    </>
}

export default RecipeForm