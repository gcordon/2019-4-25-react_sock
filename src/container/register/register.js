import React, { Component } from 'react';
import LOGO from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio, } from 'antd-mobile';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import { register } from '../../redux/user.redux'
import './register.css'

// 高阶组件
import imoocForm from '../../component/imooc-form/imooc-form.js'

const RadioItem = Radio.RadioItem;
@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        console.log(this.props.RedirectRouterTo)
    }
    componentDidMount() {
        // 设计默认值 =》 这里是传递给高阶组件的
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        console.log(this.state)
        this.props.register(this.props.state)
        console.log('注册')
    }
 
    render() {
        return (
            <div>
                <LOGO></LOGO>
                <List>
                    {this.props.RedirectRouterTo ? <Redirect to={this.props.RedirectRouterTo}/> : null}
                    {this.props.msg ? <p class="error_msg">{this.props.msg}</p>:null}
                    <InputItem clear placeholder="username" 
                        onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="password" placeholder="password" 
                        onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem clear type="repassword" placeholder="repassword" 
                        onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        onChange={v => this.props.handleChange('type','genius')}
                        checked={this.props.state.type === 'genius'} >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        onChange={v => this.props.handleChange('type', 'boss')}
                        checked={this.props.state.type === 'boss'}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        );
    }
}

export default Register;