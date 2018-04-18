import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        // console.log(navList)
        const { pathname } = this.props.location
        // console.log(pathname)
        return (
            <div>
                <TabBar>
                    {
                        navList.map(v => (
                            <TabBar.Item
                                key={v.path}
                                title={v.text}
                                icon={{ uri: require(`./tabbarimg/${v.icon}.png`) }}
                                selectedIcon={{ uri: require(`./tabbarimg/${v.icon}-active.png`) }}
                                selected={v.path === pathname}
                                onPress={() => { this.props.history.push(v.path) }}
                            >
                            </TabBar.Item>
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar