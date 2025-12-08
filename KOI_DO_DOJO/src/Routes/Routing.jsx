import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../Pages/Inicio";
import LoginRegister from "../Pages/LoginRegister";
import Perfil from "../Pages/Perfil.jsx";
import QuienesSomos from "../Pages/QuienesSomos.jsx";
import Dojo from "../Pages/Dojo.jsx";
import Calendario from "../Pages/Calendario";
import Eventos from "../Pages/Eventos.jsx";
import Contactenos from "../Pages/Contactenos.jsx";
import GestionEventosPage from "../Pages/GestionEventosPage.jsx";
import InscribirsePage from "../Pages/InscribirsePage.jsx";
import Autorizacion from "../Components/Perfil/Autorizacion.jsx";

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />

                {/* Perfil protegido con Autorizacion */}
                <Route
                    path="/Perfil"
                    element={
                        <Autorizacion>
                            <Perfil />
                        </Autorizacion>
                    }
                />

                <Route path="/QuienesSomos" element={<QuienesSomos />} />
                <Route path="/Dojo" element={<Dojo />} />

                {/* Calendario protegido con Autorizacion */}
                <Route
                    path="/calendario"
                    element={
                        <Autorizacion>
                            <Calendario />
                        </Autorizacion>
                    }
                />

                {/* Gestión de eventos protegido con Autorizacion */}
                <Route
                    path="/gestion-eventos"
                    element={
                        <Autorizacion>
                            <GestionEventosPage />
                        </Autorizacion>
                    }
                />

                {/* Inscripción a eventos */}
                <Route
                    path="/inscribirse-evento"
                    element={
                        <Autorizacion>
                            <InscribirsePage />
                        </Autorizacion>
                    }
                />

                <Route path="/Eventos" element={<Eventos />} />
                <Route path="/Contactenos" element={<Contactenos />} />
                <Route path="/loginregister" element={<LoginRegister />} />
            </Routes>
        </Router>
    );
}

export default Routing;
