import React, { Component } from 'react'

class LoggedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { user, logOut } = this.props
        return (
            <div className="form__container">
                <div className="form__content form__content--logout">
                    Salut {user.name}
                    <button className="button_submit" type="submit" onClick={logOut}>Log out</button>
                </div>
            </div>
        )
    }
}

export default LoggedIn;