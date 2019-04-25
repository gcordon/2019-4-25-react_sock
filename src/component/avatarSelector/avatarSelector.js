import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';


// 类型检测
import PropTypes from 'prop-types'

class avatarSelect extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props)
        this.state = {
            icon: ''
        }
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))

        const Select = this.state.icon
            ? (<div>
                <span>
                    已选择：<img style={{width:40}} src={this.state.icon} />
                </span>
            </div>)
            : (<div>未选择</div>)
        return (
            <div>
                <List renderHeader={() => Select}>
                    <Grid 
                        columnNum={5}
                        data={avatarList} 
                        onClick={elm => {
                            // 给当前选择的头像和文字
                            this.setState(elm)
                            // 传递给父组件
                            this.props.selectAvatar(elm.text)
                        }}
                        />
                </List>
            </div>
        );
    }
}

export default avatarSelect;