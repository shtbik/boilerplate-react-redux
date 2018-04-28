// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { app as appRoutes } from 'routes'
import { modules } from 'modules'

import _ from 'lodash'

import styles from './index.less'

const { fetch } = modules.api
const { setIn } = modules.generic
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const renderRoutes = ({ path, component, exact }) => (
	<Route key={path} exact={exact} path={path} component={component} />
)

type PropTypes = {
	generic: Object,
	ns: string,
	dispatch: Function,
}

class App extends Component<PropTypes> {
	props: PropTypes

	componentDidMount() {
		const { dispatch, ns } = this.props
		dispatch(
			setIn(`${ns}.userSettings`, {
				collapsed: false,
			})
		)

		dispatch(
			fetch({
				location: 'jsonplaceholder:posts/1',
				params: {
					onSuccess: response => {
						dispatch(setIn(`${ns}`, response.data))
						console.log('Success: ', response.data)
					},
					onFailure: error => {
						console.log('Error: ', error)
					},
				},
			})
		)
	}

	onCollapse = collapsed => {
		const { dispatch, ns } = this.props
		dispatch(
			setIn(`${ns}.userSettings`, {
				collapsed,
			})
		)
	}

	render() {
		const { generic = {}, ns } = this.props
		const { userSettings = {} } = _.get(generic, ns, {})
		const { collapsed } = userSettings

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
					<div className={styles.logoBlock} />
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={styles.menu}>
						<Menu.Item key="1">
							<Icon type="pie-chart" />
							<span>
								<NavLink to="/">Main</NavLink>
							</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="desktop" />
							<span>
								<NavLink to="page-2">Test page</NavLink>
							</span>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={
								<span>
									<Icon type="user" />
									<span>User</span>
								</span>
							}
						>
							<Menu.Item key="3">Tom</Menu.Item>
							<Menu.Item key="4">Bill</Menu.Item>
							<Menu.Item key="5">Alex</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={
								<span>
									<Icon type="team" />
									<span>Team</span>
								</span>
							}
						>
							<Menu.Item key="6">Team 1</Menu.Item>
							<Menu.Item key="8">Team 2</Menu.Item>
						</SubMenu>
						<Menu.Item key="9">
							<Icon type="file" />
							<span>File</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<Switch>
								{appRoutes.map(route => renderRoutes(route))}
								<Route component={() => <div>404</div>} />
							</Switch>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Aleksandr Shtykov</Footer>
				</Layout>
			</Layout>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	generic: state.generic,
	// api: state.api,
	// auth: state.auth,
	ns: _.camelCase(ownProps.location.pathname) || 'mainPage',
})

export default hot(module)(connect(mapStateToProps)(App))
