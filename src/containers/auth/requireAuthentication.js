import React from 'react';
import { connect } from 'react-redux';

export function requireAuthentication(Component) {


    class AuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props)

            this.state = { token: localStorage.getItem('user_token') || null }
        }


        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            const { token } = this.state
            if (token === null) {
                this.props.router.push('/');
            }
        }

        render() {
            const { token } = this.state
            return (
                <div>
                    {token !== null ? <Component {...this.props}/>
                    : <h1>Unauthorized Access</h1>
                    }
                </div>
            )

        }
    }

    const mapStateToProps = ({ auth }) => {
        return { auth }
    }

    return connect(mapStateToProps)(AuthenticatedComponent);

}