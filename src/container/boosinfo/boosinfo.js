import React, { Component } from 'react'
import { NavBar,  InputItem, TextareaItem, Button,  } from 'antd-mobile'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'
import AvatarSelect from '../../component/avatarSelector/avatarSelector'

@connect(
    state=>state.user,
    {update}
)
class boosinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: '',
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
        console.log(this.state.title)
    }
    render() {
        return (
            <div>
                {this.props.RedirectRouterTo ? <Redirect to={this.props.RedirectRouterTo }></Redirect> : null}
                <NavBar mode="dark" >信息完善页面</NavBar>
                <AvatarSelect
                    selectAvatar={(avatar) => {
                        this.setState({
                            avatar
                        })
                    }}
                ></AvatarSelect>
                <InputItem
                    onChange={(v) => this.onChange('title', v)}
                >
                招聘职位
                </InputItem>
                <InputItem
                    onChange={(v) => this.onChange('company', v)}
                >
                    公司名称
                </InputItem>
                <InputItem
                    onChange={(v) => this.onChange('money', v)}
                >
                    职位薪资
                </InputItem>
                <TextareaItem 
                    rows={3}
                    onChange={(v) => this.onChange('desc', v)}
                    autoHeight
                    title='职位要求'
                >
                </TextareaItem>
                <Button 
                    onClick={ () => this.props.update(this.state)}
                    type="primary"
                    >保存</Button>
            </div>
        )
    }
}

export default boosinfo