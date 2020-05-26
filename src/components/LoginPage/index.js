import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import LoggedIn from '../LoggedIn'
import './style.css'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        const userCookie = (localStorage.getItem('user') === 'undefined' || localStorage.getItem('user') === undefined )? {
            user: {
                profile: undefined,
                loggedIn: false
            }
        } : {
                user: {
                    profile: JSON.parse(localStorage.getItem('user')),
                    loggedIn: true
                }
            }

        this.state = {
            usernmame: '',
            password: '',
            user: userCookie.user
        }
    }

    responseFacebook = (response) => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response))
        this.setState({ user: { profile: response, loggedIn: true } })
    }

    logOut = () => {
        this.setState({
            user: {
                profile: undefined,
                loggedIn: false
            }
        })
    }

    render() {
        console.log(this.state)
        const { username, password, user } = this.state
        if (user.loggedIn) {
            return <LoggedIn user={user.profile} logOut={this.logOut} />
        }
        return (<div className="form__container">
            <div className="form__content">
                <h2>Login</h2>
                <form>
                    <div className="form__input">

                        <label htmlFor="username">
                            Username
                        <input
                                type="text"
                                autoComplete="off"
                                name="username"
                                value={username}
                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                placeholder="👨 Type your username"></input>
                        </label>
                    </div>
                    <div className="form__input">
                        <label htmlFor="password">
                            Password
                        <input
                                type="password"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                placeholder="🔐 Type your password"></input>
                        </label>
                    </div>
                    <button className="button_submit" type="submit" onClick={(e) => e.preventDefault()}>Login</button>
                </form>
                <h2>Login with SSO</h2>
                <div>
                    <FacebookLogin
                        appId="292320911937319"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
                </div>
            </div>
        </div >)
    }
}

export default LoginPage