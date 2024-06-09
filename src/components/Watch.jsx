import React from "react";

class Watch extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTime: new Date()
        }
    }

    componentDidMount() {
        this.timerId = setInterval(()=>
            this.tick(), 1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick(){
        this.setState({
            currentTime: new Date()
        })
    }

    render() {
        return (
            <span>
                {this.state.currentTime.toLocaleTimeString()}
            </span>
        )
    }
}

export default Watch