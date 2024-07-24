
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
import AddProblems from './pages/AddProblems';
import MyAddedProblems from './pages/MyAddedProblems';
import ExecutePage from './pages/ExecutePage';
function App() {
  return (
    <div className='w-screen min-h-screen bg-[#f5f5f5]'>
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
             <Route path = "/problems/problem/execute/:problemId" element = {<ExecutePage/>} />

            <Route element = {<Dashboard/>}>
                  <Route path = "/dashboard/myprofile" element = {<MyProfile/>}/>
                  <Route path = "/dashboard/addproblem" element = {<AddProblems/>}/>
                  <Route path = "/dashboard/mycreatedproblems" element = {<MyAddedProblems/>}/>
            </Route> 

        </Routes>
    </div>
  );
}

export default App;
