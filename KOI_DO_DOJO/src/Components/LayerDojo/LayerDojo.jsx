import '/src/Styles/LayerDojo/LayerDojo.css';
import { useNavigate } from 'react-router-dom';

function LayerDojo() {
    const navigate = useNavigate();
    return (
        <div className='LayerDojo'>

            <div className='ContenidoDojo'>
                <h2 className='TituloLayerDoyo1'>Bienvenidos a Nuestro Dojo</h2>

                <h1 className='TituloLayerDoyo'>
                    El Camino del Arte Marcial en Costa Rica
                </h1>

                <p className='ParrafoVideo'>
                    Descubre un espacio sagrado donde la tradición japonesa se encuentra con el espíritu costarricense.
                    Aquí comienza tu transformación física, mental y espiritual.
                </p>

                <div className="BotonesDojo">
                    <button className="BtnDojo"  onClick={() => navigate("/Perfil")}>Únete Ahora</button>
                    <button className="BtnDojo BtnBlanco"   onClick={() => navigate("/QuienesSomos")}>Conoce Más</button>
                </div>
            </div>

            <video 
                className='VideoDojo'
                src="../src/Images/video/LayerDojo.MP4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

        </div>
    );
}

export default LayerDojo;
