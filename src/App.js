
import { Route, Routes } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import VerifyEmail from './pages/VerifyEmail';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';
import ProblemsByTagPage from './pages/ProblemsByTagPage';
import Problems from './pages/Problems';
import Navbar from './components/common/Navbar';
import ProblemPage from './pages/ProblemPage';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
function App() {
  return (
    <div className='w-screen min-h-screen bg-blue-400'>
        {/* navbar component take it from components/common */}
        <Navbar/>

        <Routes>
             <Route path = "/" element = {<Home/>} />
             <Route path = "/about" element = {<AboutUs/>} />
             <Route path = "/contact" element = {<ContactUs/>} />
             <Route path = "/verifyemail" element = {<VerifyEmail/>} />
             <Route path = "/signin" element = {<LoginPage/>} />
             <Route path = "/signup" element = {<SignUp/>} /> 




             <Route path = "/problems" element = {<Problems />} />
             <Route path = "/problems/:tag" element = {<ProblemsByTagPage/>} />
             <Route path = "/problems/problem/:problemId" element = {<ProblemPage/>} />


            <Route element = {<Dashboard/>}>
                  <Route path = "/dashboard/myProfile" element = {<MyProfile/>}/>
            </Route> 

        </Routes>
    </div>
  );
}

export default App;
