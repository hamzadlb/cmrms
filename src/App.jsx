import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Rdashboard from "./components/Rdashboard";
import LandingPage from "./components/LandingPage";
import Fdashboard from "./components/Fdashboard";
import Adashboard from "./components/Adashboard";

import {Route, Routes} from "react-router-dom";

export default function App() {
  
  return (
      
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="" element={<LandingPage/>}/>
            <Route path="/Rdashboard"
                  element={
                  <Layout>
                    <Rdashboard/>
                  </Layout>
                }/>
            <Route path="/Fdashboard"
                  element={
                  <Layout>
                    <Fdashboard/>
                  </Layout>
                }/>
            <Route path="/Adashboard" element={
              <Layout>
                <Adashboard/>
              </Layout>
            }/>
            
        </Routes>
    )
}