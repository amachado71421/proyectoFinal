import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio";
import LoginPage from "../Pages/LoginPage";


function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </Router>
    )
}
export default Routing