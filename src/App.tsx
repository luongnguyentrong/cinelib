import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing"
import ViewAll from "./components/ViewAll"
import Details from "./components/Details"
import Header from "./components/Header"

function App() {
	return (
		<BrowserRouter>
			<Header />
			
			<Switch>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route exact path="/list/:list_id">
					<ViewAll />
				</Route>
				<Route exact path="/movie/:id">
					<Details />
				</Route>
				
				<Route>
					<div>Something</div>
				</Route>
				{/* <Redirect to="/" /> */}
			</Switch>
		</BrowserRouter>
	)
}

export default App
