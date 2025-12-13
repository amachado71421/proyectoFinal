import React, { useState } from 'react';
import { send } from '@emailjs/browser';
import '../../Styles/Contacto.css';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        send(
            'service_g9w2j8c', // Service ID
            'template_9eaqyj9', // Template ID
            formData,
            'ww2dGR69sy8Gz6yt0' // Public Key
        )
        .then((result) => {
            console.log(result.text);
            alert('Mensaje enviado exitosamente!');
            setFormData({ name: '', email: '', message: '' });
        }, (error) => {
            console.log(error.text);
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
        });
    };

    return (
        <div className="contact-container">
            <h2 className="contact-title">Contacto</h2>
            <form onSubmit={sendEmail} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message" className="form-label">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="form-button">Enviar</button>
            </form>
        </div>
    );
};

export default Contacto;
