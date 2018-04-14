import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        // console.log(this.props.selectAvatar)
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',').map(v => ({
                icon: require(`./avatarimgs/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.icon ? (
            <div>
                <span>已选择头像</span>&nbsp;&nbsp;
                <img style={{ width: 13 }} src={this.state.icon} alt=''/>
            </div>
        ) : '请选择头像'
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={
                            e => {
                                this.setState(e)
                                this.props.selectAvatar(e.text)
                            }
                        }
                    />
                </List>
            </div>
        )

    }
}
export default AvatarSelector