import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewHomePage from "./Components/NewHomepage/Homepage"
import Cart from "./Components/Cart/Cart.jsx"
import Login from "./Components/Login/Login.jsx"
import Signup from "./Components/Signup/Signup.jsx"
import Dashboard from "./Components/Dashboard/Dashboard";
import States from './Context/States'
import  ProtectedRoute from "./Routing";
import AdminLogin from './Components/Admin/Admin-Login'
import AdminDashboard from './Components/Admin Dashboard/Dashboard'
import Contact from './Components/Contact/Contact'
import Orders from "./Components/Orders/Orders";
import Services from "./Components/Services/Services";
import RequestQuote from './Components/Services/RequestQuote'

function App() {

  return (
       <div className="App">
        <States>
          <BrowserRouter >
            <Routes>                
              <Route exact path="/"  element={<NewHomePage/>} />
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/createaccount" element={<Signup/>}/>
              <Route exact path="/checkout" element={
                  <ProtectedRoute>
                  <Cart/>
                  </ProtectedRoute>
              }/>
              <Route exact path="/dashboard" element={
                  <ProtectedRoute>
                  <Dashboard/>
                  </ProtectedRoute>
              }/>

              <Route exact path="/staging.admin" element={<AdminLogin/>}/>
              <Route exact path="/admindashboard" element={
                  <ProtectedRoute>
                    <AdminDashboard/>                     
                  </ProtectedRoute>
              }/>
              <Route exact path="/contact" element={<Contact/>}/>
              <Route exact path="/services" element={<Services/>}/>
              <Route exact path="/requestquote" element={<RequestQuote/>}/>
              
              <Route exact  path="/order" element={<Orders/>}/>
                

           
            </Routes>
        </BrowserRouter>
      </States>
    </div>
  );
}

export default App;
