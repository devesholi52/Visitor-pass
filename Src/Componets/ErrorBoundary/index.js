import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import sad_robot from '../../assets/sad_robot.jpeg';
import { height } from '../../Utils';

export class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
            error: null,
        };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true, error: error });
    }
    render() {
        if (this.state.hasError) {
            return (
                <View style={style.container}>
                    <View style={style.mainContainer}>
                        <Image source={sad_robot} style={style.img} />
                        <Text style={style.errorTitle}> Oops .... ! </Text>
                        <Text style={style.errorDesc}> Something went wrong. </Text>
                        <Text style={style.errorDesc}> Sorry about that. </Text>
                        {this.props.ENV !== 'PROD' && this.state.error && (
                            <ScrollView style={style.scrollContainer}>
                                <Text style={style.errorCode}>
                                    {JSON.stringify(this.state.error)}
                                </Text>
                            </ScrollView>
                        )}
                    </View>
                </View>
            );
        } else {
            return <View style={style.childrenWrapper}>{this.props.children}</View>;
        }
    }
}
const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    mainContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    img: {
        height: 150,
        width: 150,
    },
    errorTitle: {
        fontSize: 30,
        color: '#0097EB',
        lineHeight: 30,
        fontFamily: 'Poppins-Medium',
    },
    errorDesc: { fontSize: 20, color: '#BDBDBD', fontFamily: 'Poppins-Medium' },
    childrenWrapper: { backgroundColor: 'white', flex: 1 },
    scrollContainer: {
        height: height / 2,
        padding: 10,
    },
    errorCode: { fontSize: 13, color: 'red', fontFamily: 'Poppins-Medium' },
});