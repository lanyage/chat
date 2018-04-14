import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
class NavLinkBar extends React.Component {
    static propTypes = {
        data : PropTypes.array.isRequired
    }

    render() {
        const navList = this.props.data.filter(v=>!v.hide)
        console.log(navList)
        return (
            <div>
                <TabBar>
                    {
                        navList.map(v=>(
                            <TabBar.Item
                                key={v.path}
                                title={v.text}
                                icon={{uri:require(`./tabbarimg/${v.icon}.png`)}}
                                selectedIcon={{uri:require(`./tabbarimg/${v.icon}-active.png`)}}></TabBar.Item>
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar