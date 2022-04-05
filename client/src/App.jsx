import './App.css';
import TableOutput from './TableOutput';
function App() {
  const titulos = ["id", "title","amount"];
  const arreglo = [[1,"ariana",33],[2,"canela",5]];
  return (
    
    <div className="App">
        <TableOutput contentRows= {arreglo} columnTitles = {titulos} />   
    </div>
  )
}

export default App;
