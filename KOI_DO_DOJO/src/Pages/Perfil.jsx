import BarraMenu from '../Components/BarraMenu';
import UserProfile from '../Components/Perfil/UserProfile';
import '/src/Styles/UserProfile.css';


function Perfil() {
    return (
        <div>
            <BarraMenu />
            <div className="div-perfil">
                <UserProfile />
            </div>
        </div>
    );
}

export default Perfil;
