import React, { Component } from 'react';
import Proptypes from 'prop-types'
import { Card, } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
class usercard extends Component {
    static proptypes = {
        userlist: Proptypes.array.isRequired
    }
    // 跳转到聊天页面
    handleRoute(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <div>
                {this.props.userlist.map(v => (
                    <Card key={v._id}>
                        {v.avatar
                            ?
                            (
                                <div>
                                    <Card.Header
                                        key={v._id}
                                        title={v.user}
                                        thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<span>{v.title}</span>}
                                        onClick={() => {
                                            this.handleRoute(v)
                                        }}
                                    />
                                    <Card.Body>
                                        {v.desc.split('\n').map(d => (
                                            <div key={d}>{d}</div>
                                        ))}
                                        {v.company ? <div>公司：{v.company}</div> : null}
                                    </Card.Body>
                                </div>

                            )
                            : null}
                    </Card>
                ))}
            </div>
        );
    }
}

export default usercard;