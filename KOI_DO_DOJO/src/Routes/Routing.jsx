import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio";
import LoginRegister from "../Pages/LoginRegister";
import Calendario from "../Pages/Calendario";


function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="loginregister" element={<LoginRegister/>}/>
                <Route path="calendario" element={<Calendario/>}/>
            </Routes>
        </Router>
    )
}
export default Routing