import React from 'react'
/**
 * 这个是一个包装类，通过给表单组建进行包装，让每个组建在标签内容变化
 * 的时候能够同时改变state的状态
 * @param {*} Comp  需要被包装的组建
 */
export default function onContentChange(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key, val) {
            console.log(key, val)
            this.setState({
                [key]:val
            })
        }

        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}