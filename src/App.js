import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
    constructor(props){
        super(props)
        axios.get('/user')                                   // 使用axios
            .then(res => { console.log(res) })
    }
    render() {
        return (
            <div>
                <h1>App page</h1>
            </div>
        );
    }
}

export default App;
