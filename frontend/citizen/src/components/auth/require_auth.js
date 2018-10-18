import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ADMIN = 2;
export const STAFF = 1;
export const REGULAR = 0;

export default function(ComposedComponent, allowed) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.replace({ pathname: '/signin/' })
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.replace({ pathname: '/signin/' })
            }
        }

        render () {
            if ((allowed === ADMIN) && (this.props.account.is_superuser === true)) {
                return <ComposedComponent {...this.props} />
            } else if ((allowed === STAFF) && (this.props.account.is_staff === true)) {
                return <ComposedComponent {...this.props} />
            } else if ((allowed === REGULAR)) {
                return <ComposedComponent {...this.props} />
            } else {
                return <div>Unauthorized</div>
            }

        }
    }

        function mapStateToProps(state) {
            return { authenticated: state.auth.authenticated,
            account: state.account };
        }

        return connect(mapStateToProps)(Authentication);
    }

