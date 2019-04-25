import React from 'react'
export default function imoocForm(Comp) {
    return class imoocForm extends React.Component {
        constructor(props) {
            super(props)
            this.handleChange = this.handleChange.bind(this)
            this.state = {

            }
        }
        componentDidMount() {
            // console.log('高阶组件 imooc-form')
        }
        handleChange(key, val) {
            console.log(key,val);
            this.setState({
                [key]: val
            })
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        } 
    }
}