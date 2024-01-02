import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Dot from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/AntDesign'
import { Fonts, staticImage } from '../../Utils';

export default function VisitorHistoryCard({ data, navigation, onToggle, closeMenuOption, active, }) {


    return (
        <Pressable style={styles.Maincontainer}>
            <View style={styles.container}>
                <Image source={{ uri: data?.image ? data?.image : staticImage }} style={styles.imageTop} />
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.title}>{data?.visitor_name}</Text>
                    <Text style={styles.desc}>Check-in {data?.visit_time} {data?.visit_time}</Text>
                    <Text style={styles.desc}>Check-Out 12:35PM</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.HistoryButton}
                onPress={() => navigation.navigate("RegisteredUserScreen", { VisitorId: data?.id })}>
                <Text style={{ color: '#fff', fontSize: 12 }}>Check History</Text>
            </TouchableOpacity>
            {/* <Text style={styles.toptimetext}>
                {data?.updated_on}
            </Text> */}
        </Pressable>
    )
}
const styles = StyleSheet.create({

    Maincontainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
    },
    imageTop: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        marginRight: 7,
        borderRadius: 100
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 15
    },
    title: {
        fontSize: 15,
        paddingLeft: 10,
        color: "#000",
        fontFamily: Fonts.RobotoMedium,
    },
    desc: {
        color: "grey",
        paddingLeft: 10,
        fontFamily: Fonts.RobotoMedium,
        fontSize: 13,
        marginTop: 2
    },
    ButtonText: {
        marginLeft: 10,
        marginTop: 5
    },
    toptimetext: {
        position: 'absolute',
        top: 25,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        fontFamily: Fonts.RobotoRegular,
        fontSize: 13
    },
    HistoryButton: {
        paddingHorizontal: 17,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        margin: 13,
        borderRadius: 15,
        backgroundColor: '#008080'
    }

}

)
