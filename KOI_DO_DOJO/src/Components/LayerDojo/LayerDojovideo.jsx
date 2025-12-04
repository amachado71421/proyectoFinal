// src/components/LayerDojoVideo.jsx
import '/src/Styles/LayerDojo/LayerDojoVideo.css';

export default function LayerDojoVideo() {
    return (
        <div className="layer-video-container">
               {/* TÍTULO ENCIMA DEL VIDEO */}
            <h1 className="layer-video-title">
                “Descubre la Fuerza del Karate – Mirá el Video”
            </h1>
            <div className="video-wrapper">
                <video
                    className="dojo-video"
                    controls
                    autoPlay={false}
                    muted={false}
                >
                    <source src="/src/Images/Video/LayerDojoVid.mp4" type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </div>
        </div>
    );
}
