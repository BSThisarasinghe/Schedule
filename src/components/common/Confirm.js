import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => { }}
        >
            <View style={styles.containerStyle}>
                <View style={{ backgroundColor: '#fff' }}>
                    <CardSection style={styles.cardSectionStyle}>
                        <Text style={styles.textStyle}>{children}</Text>
                    </CardSection>

                    <CardSection style={{ marginLeft: 0, marginRight: 0 }}>
                        <Button onPress={onAccept} style={{ borderWidth: 0.5, borderColor: '#0D92DC' }} textStyle={{ color: '#0D92DC' }}>Yes</Button>
                        <Button onPress={onDecline} style={{ borderWidth: 0.5, borderColor: '#0D92DC' }} textStyle={{ color: '#0D92DC' }}>No</Button>
                    </CardSection>
                </View>
            </View>
        </Modal>
    );
}

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 120,
        padding: 20
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textStyle: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        padding: 8
    }
}
export { Confirm };