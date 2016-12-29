import React from 'react';
import { connect } from 'react-redux';

export function requireAuthentication(Component) {

    let token = localStorage.getItem('user_token') || null

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (token === null) {
                this.props.router.push('/');
            }
        }

        render() {
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