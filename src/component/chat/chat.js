import React, { Component } from 'react'
import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid ,  } from 'antd-mobile';
import {connect} from 'react-redux'
import { getMsgList, recvMsg, sendMsg } from '../../redux/chat.redux'
import { relative } from 'path';
import {getChatId} from '../../util.js'

const server = io('ws://localhost:9093')
@connect(
    state=>state,
    { getMsgList,  recvMsg, sendMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            // emoji的显示和隐藏
            showEmoji: false,
            msg: [],
        }
        window.props = this.props
    }
    componentDidMount() {
        // server.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        if (!this.props.chat.chatmsg.length) {
            // 获取聊天消息
            this.props.getMsgList()
            // 获取最新一条的信息
            this.props.recvMsg()
        }
        setTimeout(function(){
            //向window派发一个resize内置事件
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit() {
        // server.emit('sendmsg', {text: this.state.text}, function() {
        //     console.log(`客户端发送socket${this.state.text}`)
        // })

        // 发送者 （我）
        const from = this.props.user._id
        // 接收者 =》 url
        const to = this.props.match.params.userid
        // 消息
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }
    render() {
        const { userid } =  this.props.match.params 
        const Item = List.Item
        const currentid = this.props.user._id
        // 帅选指定的消息chatid,从后台Chatid中查找
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid==getChatId(userid, currentid))
        // emoji表情
        // 把字符串以空格分割成数组
        const emoji = '😄 😃 😀 😊 ☺ 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢👕 👔 👚 👗 🎽 👖 👘👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤ 💔 💗 💓 💕 💖 💞 💘 💌 💋 💍 💎 👤 👥 💬 👣 💭' 
                        .split(' ')
                        .map(v => ({
                            text: v
                        }))
         if (!this.props.chat.users[userid]) {
            return null
        }
        
        return (
            // id="chat-page"
            // className="chat-me"
            <div id="chat-page" >
                <NavBar 
                    style={{zIndex:9,position:relative}}
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() } }
                    mode="dark" 
                >
                    {this.props.chat.users[userid].name}
                </NavBar>
                <div style={{marginTop:40}}>
                    {chatmsg.map(v => {
                        const avatar = require(`../img/${this.props.chat.users[v.from].avatar}.png`)
                        return (v.from == userid ?
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >
                                    {v.content}
                                </Item>
                            </List>
                            :
                            <List key={v._id}>
                                <Item 
                                    extra={<img src={avatar} />}
                                    className="chat-me"  
                                >
                                    Me: {v.content}
                                </Item>
                            </List>)
                    })}
                </div>
                <div className="stick-footer">
                   <div className="footer">
                        <List>
                            <InputItem
                                placeholder="请输入内容"
                                value={this.state.text}
                                onChange={v => {
                                    this.setState({ text: v })
                                }}
                                extra={
                                    <div>
                                        <span
                                            style={{marginRight:15}}
                                            onClick={() => {
                                                this.setState({
                                                    showEmoji: !this.state.showEmoji
                                                })
                                            }}
                                        >😃</span>    
                                        <span onClick={() => this.handleSubmit()}>发送</span>
                                    </div>
                                }
                            />
                        </List>
                        <div >
                                {setTimeout(function () {
                                    //向window派发一个resize内置事件
                                    window.dispatchEvent(new Event('resize'))
                                }, 0)}
                                {this.state.showEmoji?
                                <Grid
                                    isCarousel={true}
                                    columnNum={9}
                                    carouselMaxRow={4}
                                    data={emoji}
                                    onClick={v=>{
                                        this.setState({
                                            text: this.state.text+v.text
                                        })
                                    }}
                                />
                                :null}
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

export default Chat