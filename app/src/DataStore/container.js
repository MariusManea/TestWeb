import { connect } from 'react-redux';
import { Component } from './Component';

const mapStateToProps = state => {
    return {
        data: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleUpdateData: () => dispatch({ type: 'UPDATE' }),
        handleResetData: () => dispatch({ type: 'RESET' })
    }
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(Component);