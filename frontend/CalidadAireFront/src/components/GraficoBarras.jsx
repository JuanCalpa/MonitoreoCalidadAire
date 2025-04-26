import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function GraficoBarras() {
  const [data, setData] = useState([])

  // Función que trae el último dato
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
        ];
        setData(datosAdaptados);
      })
      .catch(error => console.error('Error al obtener el último dato:', error))
  }

  useEffect(() => {
    fetchUltimoDato(); // Cargar al inicio

    const intervalo = setInterval(() => {
      fetchUltimoDato(); // Cargar cada 5 segundos
    }, 5000);

    return () => clearInterval(intervalo); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  return (
    <BarChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="valor" fill="#8884d8" />
    </BarChart>
  )
}

export default GraficoBarras
