import React, { Component } from 'react';
import { Text, View, BackHandler, ListView } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';

class ListItem extends Component {
    render(){
        const { reminder } = this.props.schedule;
        return(
            <CardSection>
                <Text>
                    {reminder}
                </Text>
            </CardSection>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default ListItem;