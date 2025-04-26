import Navbar from './components/navBar'
import GraficoBarras from './components/GraficoBarras'

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-xl font-bold">Bienvenido a la App de Calidad del Aire</h1>
        <GraficoBarras />
      </main>
    </div>
  )
}

export default App
