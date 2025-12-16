import BarraMenu from '../Components/BarraMenu';
import Logros from '../Components/Perfil/Logros';
import Palmares from '../Components/Perfil/Palmares';
import UserProfile from '../Components/Perfil/UserProfile';


function Perfil() {
    return (
        <div className="perfil-container">
            <BarraMenu />
            <div className="div-perfil">
                <UserProfile />
            </div>
        </div>
    );
}

export default Perfil;

