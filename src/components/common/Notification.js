import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import { userFetch } from '../../actions';
import { Spinner } from './Spinner';

class Notification extends Component {
    state = {
        user_name: '',
        loading: true,
        level: ''
    };


    onSelectOpt(idx, value) {
        this.setState({ level: value });
        if (value === "Logout") {
            firebase.auth().signOut();
            this.setState({ user_name: '' });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.username.length > 0){
            this.setState({ user_name: nextProps.username[0].display_name });
        }
    }

    componentDidMount() {
        this.props.userFetch();
    }

    showLogout() {
        return (
            <ModalDropdown options={[this.state.user_name, 'Logout']} onSelect={(idx, value) => this.onSelectOpt(idx, value)} style={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 20 }} dropdownStyle={{ width: 100, height: 82, paddingBottom: 0 }} dropdownTextStyle={{ color: '#000', fontSize: 15 }} dropdownTextHighlightStyle={{ fontWeight: 'bold' }} >
                <View style={{ height: 30, width: 60, alignItems: 'center', paddingRight: 20 }}>
                    <Image
                        source={require('../pics/logout.png')}
                        style={styles.downStyle}
                    />
                </View>
            </ModalDropdown>
        );
    }

    render() {
        // console.log(this.props.username.length);
        return (
            <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                <View style={{ height: 30, width: 60, backgroundColor: 'transparent' }}>
                    {this.showLogout()}
                </View>
            </View>
        )
    }
}

const styles = {
    imageStyle: {
        width: 25,
        height: 25
    },
    buttonStyle: {
        marginLeft: 5,
        marginRight: 7
    },
    spinnerStyle: {
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100
    },
    downStyle: {
        width: 25,
        height: 25
    }
}

const mapStateToProps = state => {
    const username = _.map(state.username.user_details, (val, uid) => {
      return { ...val, uid };
    });
  
    return { username };
  }

export default connect(mapStateToProps, { userFetch })(Notification);