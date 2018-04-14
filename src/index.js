import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducer'

import Auth from './component/auth'
import Login from './container/login'
import register from './container/register'
import BossInfo from "./container/bossinfo"
import GeniusInfo from './container/geniusinfo'
import DashBoard from './component/dashboard'


const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))
ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Auth></Auth>
					<Switch>
						<Route path='/' exact component={Login}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={register}></Route>
						<Route component={DashBoard}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	)
	, document.getElementById('root')
);
