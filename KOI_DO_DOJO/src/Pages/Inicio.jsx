import BarraMenu from '../Components/BarraMenu'
import Marciales from '../Components/LayerInicio/Marciales.jsx'
import CarruselInicio from '../Components/LayerInicio/CarruselInicio.jsx'
import KyokushinTexto from '../Components/KyokushinTexto.jsx'
import InicioLayer from '../Components/LayerInicio/InicioLayer.jsx'

import KarateBanner from '../Components/LayerInicio/Kyokushin/KarateBanner.jsx'
import KyokushinIntroduccion from '../Components/LayerInicio/Kyokushin/KyokushinIntroduccion.jsx'
import KyokushinFundador from '../Components/LayerInicio/Kyokushin/KyokushinFundador.jsx'
import KyokushinFilosofia from '../Components/LayerInicio/Kyokushin/KyokushinFilosofia.jsx'
import KarateCombate from '../Components/LayerInicio/Kyokushin/KarateCombate.jsx'
import KyokushinEntrenamiento from '../Components/LayerInicio/Kyokushin/KyokushinEntrenamiento.jsx'
import KyokushinInfluencia from '../Components/LayerInicio/Kyokushin/KyokushinInfluencia.jsx'
import KyokushinConclusion from '../Components/LayerInicio/Kyokushin/KyokushinConclusion.jsx'

import "../Styles/Inicio.css";

function Home() {
  return (
    <div>
      <BarraMenu />
      <div className='EspacioCarrusel'>
        <CarruselInicio />
      </div>
      <InicioLayer />
      <Marciales />
      <KarateBanner/>
      <KyokushinIntroduccion/>
      <KyokushinFundador/>
      <KyokushinFilosofia/>
      <KarateCombate/>
      <KyokushinEntrenamiento/>
      <KyokushinInfluencia/>
      <KyokushinConclusion/>

    </div>
  )
}

export default Home