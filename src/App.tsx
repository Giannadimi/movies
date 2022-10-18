import * as React from 'react';
import {Button} from "./components/Button/SubmitButton";
import {Input} from "./components/Input/Input";
import {Container} from "./components/Container/Container";
import './App.css';


function App() {

  return (
    <div className="App">
      <Button 
        handleClick={(event, id) => {
          console.log('Clicked', event, id)
        }}
      />
      <Input value='' handleChange={(event) => console.log(event)} />
      <Container styles={{ border: '1px solid black', padding: '15rem'}}/>
    </div>
  );
}

export default App;
