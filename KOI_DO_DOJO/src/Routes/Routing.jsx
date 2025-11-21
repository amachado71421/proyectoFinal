import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio";
import LoginRegister from "../Pages/LoginRegister";
import Perfil from "../Pages/Perfil.jsx";
import QuienesSomos from "../Pages/QuienesSomos.jsx";
import Dojo from "../Pages/Dojo.jsx";
import Calendario from "../Pages/Calendario";
import Eventos from "../Pages/Eventos.jsx";
import Ranking from "../Pages/Ranking.jsx";
import Contactenos from "../Pages/Contactenos.jsx";
import RequireAuth from "./RequireAuth";

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/Perfil" element={<Perfil />} />
                <Route path="/QuienesSomos" element={<QuienesSomos />} />
                <Route path="/Dojo" element={<Dojo />} />
                <Route
                    path="/calendario"
                    element={
                        <RequireAuth>
                            <Calendario />
                        </RequireAuth>
                    }
                />
                <Route path="/Eventos" element={<Eventos />} />
                <Route path="/Ranking" element={<Ranking />} />
                <Route path="/Contactenos" element={<Contactenos />} />
                <Route path="/loginregister" element={<LoginRegister />} />
            </Routes>
        </Router>
    );
}

export default Routing;
