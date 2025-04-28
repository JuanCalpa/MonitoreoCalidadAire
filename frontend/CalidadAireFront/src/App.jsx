import { useState, useEffect } from 'react'
import Navbar from './components/navBar'
import GraficoBarras from './components/GraficoBarras'
import './App.css' // Archivo CSS para estilos


function App() {
  const [veredicto, setVeredicto] = useState('')
  const [datosCalidadAire, setDatosCalidadAire] = useState([])

  // Función para obtener los datos reales desde la API
  const fetchUltimoDato = () => {
    fetch('http://localhost:3000/api/ultimo')
      .then(response => response.json())
      .then(dato => {
        const datosAdaptados = [
          { name: 'CO', valor: dato.CO },
          { name: 'Humedad', valor: dato.humedad },
          { name: 'PM2.5', valor: dato.pm2_5 },
          { name: 'PM10', valor: dato.pm10 },
          { name: 'Temperatura', valor: dato.temperatura }
        ]
        setDatosCalidadAire(datosAdaptados.map(d => d.valor)) // Solo los valores numéricos
      })
      .catch(error => console.error('Error al obtener el último dato:', error))
  }

  useEffect(() => {
    fetchUltimoDato()
  }, [])

  useEffect(() => {
    if (datosCalidadAire.length > 0) {
      // Calcula el veredicto basado en los datos
      const promedio = datosCalidadAire.reduce((a, b) => a + b, 0) / datosCalidadAire.length
      if (promedio <= 50) {
        setVeredicto('Buena')
      } else if (promedio <= 100) {
        setVeredicto('Moderada')
      } else {
        setVeredicto('Mala')
      }
    }
  }, [datosCalidadAire])

  return (
    <div>
      <Navbar />
      <main className="main-container">
        <section className="left-section">
          <div className="grafico">
            <h1 className="titulo">Calidad de Aire Universidad Mariana</h1>
            <div className='grafico'>{datosCalidadAire.length > 0 ? (
              <GraficoBarras datos={datosCalidadAire} />
            ) : (
              <p>Cargando datos...</p>
            )}
            </div>
          </div>
          <div className="nivel-calidad">
            <h2>NIVEL DE LA CALIDAD DEL AIRE</h2>
            <p className={`veredicto ${veredicto.toLowerCase()}`}>{veredicto.toUpperCase()}</p>
            <p>
              {veredicto === 'Buena' &&
                'El nivel de la calidad del aire es bueno porque el material particulado se encuentra por debajo del nivel estipulado por la resolución 2254 de 2017.'}
              {veredicto === 'Moderada' &&
                'El nivel de la calidad del aire es moderado, lo que puede afectar a personas sensibles.'}
              {veredicto === 'Mala' &&
                'El nivel de la calidad del aire es malo, lo que puede afectar gravemente la salud de las personas.'}
            </p>
          </div>
        </section>
        <section className="descripcion">
          <h2 >¿POR QUÉ SE CALCULA?</h2>
          <p>
          Si se habla de ambiente, la Universidad Mariana es distinguida por su calidad de aire según la comunidad de 
          la universidad, proporcionando espacios con cantidades de contaminación reducidas, principalmente por la
           regulación y prohibición de cigarrillos dentro de sus instalaciones, aunque a pesar de su destacada administración
            en su labor ecológica, no es inmune a los otros métodos de contaminación. Los ciudadanos de Colombia cuentan 
            con el derecho de permanecer en un ambiente sano y equilibrado, el Ministerio de ambiente y desarrollo sostenible 
            (2010) adoptó una política, la cual tenía como objetivo impulsar la gestión de la calidad del aire en el corto, 
            mediano y largo plazo, buscando conseguir los niveles de calidad de aire apropiados para preservar el derecho a 
            la salud y el bienestar humano. 
          </p>
        </section>
      </main>
    </div>
  )
}

export default App