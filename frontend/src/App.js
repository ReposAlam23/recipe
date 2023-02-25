import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignIn from './components/log/SignIn';
import SignUp from './components/log/SignUp';
import Main from './components/Main/Main';
import RecipeForm from './components/Main/RecipeFormPage';

function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>

      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Home" element={<Main />} />
      <Route path="/Home/RecipeForm" element={<RecipeForm />} /> 

    </Routes> 
   </BrowserRouter>
   </>
  );
}

export default App;
