import BarraMenu from '../Components/BarraMenu';
import Logros from '../Components/Perfil/Logros';
import Palmares from '../Components/Perfil/Palmares';
import UserProfile from '../Components/Perfil/UserProfile';
import '/src/Styles/UserProfile.css';


function Perfil() {
    return (
        <div className="perfil-container">
            <BarraMenu />
            <div className="div-perfil">
                <UserProfile />
            </div>

            <div className="perfil-right">
                <div className="user-palmares">
                    <Palmares />
                </div>

                <div className="user-logros">
                    <Logros />
                </div>
            </div>

        </div>
    );
}

export default Perfil;

