import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat
)
class NavLink extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // 只选择没有hide的
        const data = this.props.data.filter(v => !v.hide)
        const {pathname} = this.props.location
        return (
            <div>
                <TabBar>
                    {/* selected => 如果当前的this.props.location.pathname == 其中dataList中的path 的话 就高亮显示  */}
                    {/* badge只显示在消息的bar中 */}
                    {data.map(v => (
                            <TabBar.Item 
                                badge={v.path=='/msg'?this.props.unread:null}
                                key={v.path}
                                title={v.text}
                                icon={{ uri: require(`./img/${v.icon}.png`) }}
                                selectedIcon={{ uri: require(`./img/${v.icon}-active.png`)}}
                                selected={v.path === pathname}
                                onPress={() => {
                                    // 跳转页面
                                    this.props.history.push(v.path)
                                }}
                            >
                            </TabBar.Item>
                    )
                    )}
                </TabBar>
            </div>
        );
    }
}

export default NavLink;