import {  BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import { Container } from 'reactstrap';
import './App.css';
import FormularioRegistro from './components/FormRegistroLogin';

function App() {
  return (
    <div className="App">
    <Router>      
      <Container>        
          <Switch>
          < Route path="/">
              <FormularioRegistro/>  
            </Route>                                   
          </Switch>  
      </Container>
    </Router>    
    </div>
  );
}

export default App;
