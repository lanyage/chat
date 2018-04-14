import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../component/avatarselector'
import { Redirect } from 'react-router-dom'
import { update } from '../redux/user.redux'
import { connect } from 'react-redux'

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: ''
        }
    }
    render() {
        // console.log(this.state)
        const pathname = this.props.location.pathname
        const redirectTo = this.props.redirectTo
        return (
            <div>
                {redirectTo&& redirectTo!==pathname ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark" >牛人完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={v => { this.setState({ 'title': v }) }}>求职岗位</InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title='个人简介'
                    onChange={v => { this.setState({ 'desc': v }) }}>
                </TextareaItem>
                <Button
                    onClick={() => { this.props.update(this.state) }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
