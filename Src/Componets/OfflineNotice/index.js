import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Modal } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { width } from '../../Utils';

const MiniOfflineSign = () => (
    <Modal animationType="fade" transparent={true} visible={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.2)' }}>
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        </View>
    </Modal>
);
class OfflineNotice extends PureComponent {
    state = {
        isConnected: false,
        isType: false,
    };

    componentDidMount() {
        // Subscribe
        unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            this.handleConnectivityChange(state.isConnected, state?.type);
        });
    }

    componentWillUnmount() {
        if (unsubscribe != null) unsubscribe();
    }

    handleConnectivityChange = (isConnected, isType) => {
        this.setState({
            isConnected: isConnected,
            isType: isType,
        });
    };

    render() {
        console.log('unsubscribe', this.unsubscribe);
        if (!this.state.isConnected && this.state.isType) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: width,
        position: 'absolute',
        // top: 30,
        zIndex: 999999,
    },
    offlineText: { color: '#fff', fontFamily: 'Poppins-Medium' },
});

export { OfflineNotice };