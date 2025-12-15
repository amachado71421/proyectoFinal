import BarraMenu from '../Components/BarraMenu';
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

