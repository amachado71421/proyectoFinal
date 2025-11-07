import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio";


function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio/>} />
            </Routes>
        </Router>
    )
}
export default Routing