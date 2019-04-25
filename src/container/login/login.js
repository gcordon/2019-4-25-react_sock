import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
import { List, InputItem, WhiteSpace, Button, NoticeBar, Icon } from 'antd-mobile';
import {connect} from 'react-redux'

import {login} from '../../redux/user.redux'
import LOGO from '../../component/logo/logo'

// 高阶组件
import imoocForm from '../../component/imooc-form/imooc-form.js'
@connect(
    state=>state.user,
    {login}
)
@imoocForm
class Login extends Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.history.push('register')
    }
    handleLogin() {
        this.props.login(this.props.state)
        console.log('登录')
    }
    render() {
        const {pathname} = this.props.location
        return (
            <div>
                <LOGO></LOGO>
                <List>
                    {this.props.RedirectRouterTo && this.props.RedirectRouterTo != pathname ? <Redirect to={this.props.RedirectRouterTo} /> : null}
                    {this.props.msg ? <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>{this.props.msg}</NoticeBar>:null}
                    <WhiteSpace />
                    <InputItem clear placeholder="username"
                        onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" placeholder="password" 
                        onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace /> 
                    
                </List>
            </div>
        );
    }
}

export default Login;