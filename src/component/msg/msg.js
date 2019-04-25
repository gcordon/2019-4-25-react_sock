import React, { Component } from 'react';
import {connect} from 'react-redux'
import { List, Badge } from 'antd-mobile';

@connect(
    state=>state,
)
class Msg extends Component {
    constructor(props) {
        super(props)
        window.props = this.props
    }
    getArrLast(arr) {
        return arr[arr.length-1]
    }
    render() {
        const Item = List.Item
        const Brief = Item.Brief

        const msgGroup = {}
         this.props.chat.chatmsg.forEach(v => {
            //  等于  自己 或 空数组
             msgGroup[v.chatid] = msgGroup[v.chatid] || []
             msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup)
        return (
            <div>
                {chatList.map(v => {
                    // 如果发送者id==当前的用户的id ？ 接收者id ： 发送者id
                    const targetId = v[0].from==this.props.user._id ? v[0].to : v[0].from
                    const userinfo = this.props.chat.users

                    const lastItem = this.getArrLast(v)
                    
                    // 只帅选 未读 && to == 本地的id
                    const readNum = v.filter(v => !v.read&&v.to==this.props.user._id).length

                    if (!userinfo[targetId]) {
                        return null
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                arrow="horizontal" onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                 }}
                                extra={<Badge text={readNum}></Badge>}
                                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                            >
                                {lastItem.content}<Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
                
            </div>
        );
    }
}

export default Msg;