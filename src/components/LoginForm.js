import React, { Component } from 'react';
import { Text, BackHandler, View, Image, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLogin() {
        const { email, password } = this.state;

        this.props.loginUser({ email, password });
        // console.log(user);
        // if(user !== null){
        //     this.props.navigation.navigate('Profile');
        // }
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    UNSAFE_componentWillMount() {
        // this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps.user);
        if (nextProps.user !== null) {
            this.props.navigation.navigate('Profile');
            this.setState({ email: '', password: '' });
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onLogin.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <View style={styles.containerStyle2}>
                        <Image source={require('./pics/logo.png')} style={styles.imageStyle} />
                    </View>
                    <CardSection>
                        <Input
                            label="Email"
                            labelStyle={{ color: '#fff' }}
                            placeholder="email@gmail.com"
                            placeholderTextColor="#DBDDDE"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            style={{ color: '#fff' }}
                            secureTextEntry={false}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry={true}
                            label="Password"
                            labelStyle={{ color: '#fff' }}
                            placeholder="Password"
                            placeholderTextColor="#DBDDDE"
                            onChangeText={password => this.setState({ password })}
                            style={{ color: '#fff' }}
                            value={this.state.password}
                        />
                    </CardSection>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </KeyboardAvoidingView>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    containerStyle2: {
        marginTop: 50,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 175,
        width: 175
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);