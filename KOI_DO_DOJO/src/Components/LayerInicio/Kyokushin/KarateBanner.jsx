import '/src/Styles/Kyokushin/KarateBanner.css';

export default function KarateBanner() {
    return (
        <section className="banner">
            <img
                src="../src/Images/KyokushinInicio/banner-dojo.jpg"
                alt="Dojo Kyokushin"
                className="banner-img"
            />
            <div className="banner-texto">
                <h1>Kyokushin Karate</h1>
                <p>El Camino de la Verdad Absoluta</p>
            </div>
        </section>
    )
}
