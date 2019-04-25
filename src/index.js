import React from 'react';
import ReactDOM  from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { createStore, applyMiddleware, compose,  } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import './config'
import App from './App'
import reducer from './reducer.js'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/boosinfo/boosinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'

import Dashboard from './component/dashboard/dashboard'
// 验证状态
import Authroute from './component/authroute/authroute';
// css
import './index.css'

let store = createStore(reducer,  
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Authroute></Authroute>
                    <Switch>
                        <Route path="/bossinfo" component={BossInfo} />
                        <Route path="/geniusinfo" component={GeniusInfo} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/chat/:userid" component={Chat} />
                        {/* 404页面 */}
                        <Route component={Dashboard} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),document.getElementById('root')
)
