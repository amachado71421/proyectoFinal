// src/components/LayerDojoVideo.jsx
import React from 'react';
import '/src/Styles/LayerDojo/LayerDojoVideo.css';

export default function LayerDojoVideo() {
    return (
        <div className="layer-video-container">
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
