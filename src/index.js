import React from 'react' //react
import ReactDOM from 'react-dom' //reactDOM
import { createStore, applyMiddleware, compose } from 'redux' //创建store,中间件使用, compose为store创建所需的函数组件
import { BrowserRouter, Switch, Route } from 'react-router-dom'  //react-router-dom 4.0
import thunk from 'redux-thunk' //使redux能管理全局的状态 
import { Provider } from 'react-redux' //全局redux状态管理
import reducer from './reducer' //用于combine所有的reducers

import Auth from './component/auth'  //引入验证组件,除了login和register不需要验证之外,其他网站都会验证用户信息,如果没有用户登录信息会返回/login
import Login from './container/login' //用户登录组件
import register from './container/register' //用户注册组件 
import BossInfo from "./container/bossinfo" //boss信息页面
import GeniusInfo from './container/geniusinfo' //牛人信息页面
import DashBoard from './component/dashboard' //主页,会存在子路由
import Chat from './component/chat'
import './index.css'

/** 使用创建store */
const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

/**页面渲染*/
ReactDOM.render(
	(
		/**用Provider包裹所有组建 */
		<Provider store={store}>
			{/* react路由 */}
			<BrowserRouter>
				<div>
					{/* 用于全局的用户登录信息的验证,每个页面在render时都会加载cookie中用户的信息,如果用户信息不存在,那么就直接返回登陆页 */}
					<Auth></Auth>

					{/* react路由,switch表示命中第一个后后面的路由都不管了 */}
					<Switch>
						{/* 如果没有后缀,那么就匹配登录组件 */}
						<Route path='/' exact component={Login}></Route> 
						{/* 牛人完善信息的页面组件 */}
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						{/* Boss完善信息的页面组件 */}
						<Route path='/bossinfo' component={BossInfo}></Route>
						{/* 登录页面组件 */}
						<Route path='/login' component={Login}></Route>
						{/* 注册页面组件 */}
						<Route path='/register' component={register}></Route>
						{/* 聊天界面组件 */}
						<Route path='/chat/:user' component={Chat}></Route>
						{/* 这是dashboard页面,其下有很多子路由 */}
						<Route component={DashBoard}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	)
	, document.getElementById('root')
);
