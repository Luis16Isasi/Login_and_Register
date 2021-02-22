import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clienteAxios from './config/Axios';

//importando los componentes
import Login from './components/Login';
import Register from './components/Register';
import Usuario from './components/Usuario';

function App() {

	const [usuarios, setUsuarios] = useState([]);

	useEffect(() => {
		clienteAxios.get('/usuario')
			.then( usuarios => {
				setUsuarios(usuarios.data);
			})
			.catch( error => console.log(error))
	}, []);
	

	return (
		<Router>
			<Switch>
				<Route  
					exact path="/" component={() => 
						<Login
							usuarios={usuarios}
							setUsuarios={setUsuarios}
						/>
					}
				/>
				<Route 
					exact path="/register" component={Register}
				/>
				<Route
					exact path="/usuario/:id" component={(props) => {
						const usuario = usuarios.filter( usuario => usuario._id === props.match.params.id);
						if( usuario.length === 0 || !usuario[0]){
							return <h1 style={{textAlign: 'center'}}>---Cargando---</h1>
						}
						
						return (		
							<Usuario 
								usuario={usuario[0]}
							/>
						)
						}
					}
				/>
			</Switch>
		</Router>
	);
}

export default App;
