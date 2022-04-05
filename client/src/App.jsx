import './App.css';
import TableOutput from './TableOutput';
function App() {
  const titulos = ["numero", "segundo","tercero"];
  const arreglo = [1,2,3,4,5,6];
  return (
    
    <div className="App">
        <TableOutput contentRows= {arreglo} columnTitles = {titulos} />   
    </div>
  )
}

export default App;
