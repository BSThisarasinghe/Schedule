import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

class Toggle extends Component {

    toggleDrawer() {
        this.props.navigation.toggleDrawer();
    }

    render() {
        return (
            <TouchableOpacity style={styles.backgroundStyle} onPress={this.toggleDrawer.bind(this)}>
                <Image
                    source={require('./../pics/drawer_button.png')}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        );
    }
};

const styles = {
    backgroundStyle: {
        marginLeft: 10,
        marginRight: 5
    },
    imageStyle: {
        width: 30,
        height: 30
    }
};

export { Toggle };