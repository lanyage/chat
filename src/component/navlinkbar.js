import React from 'react'
import PropTypes from 'prop-types' //本来和React是绑定的,但是后来出于什么原因被React给抽离出来了
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component {
    /** 表示这个数据是必须传的 */
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const { pathname } = this.props.location
        return (
            <div>
                <TabBar>
                    {
                        navList.map(v => (
                            <TabBar.Item
                                //只有msg 的item才会有badge
                                badge={v.path === '/msg' ? this.props.unread : 0} 
                                //唯一的key
                                key={v.path}
                                //文字
                                title={v.text}
                                //图标,只需要一个uri就行了
                                icon={{ uri: require(`./tabbarimg/${v.icon}.png`) }}
                                //被选中后的样式
                                selectedIcon={{ uri: require(`./tabbarimg/${v.icon}-active.png`) }}
                                //哪一个是被选中的
                                selected={v.path === pathname}
                                //点击之后,需要forward到当前对应的path
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