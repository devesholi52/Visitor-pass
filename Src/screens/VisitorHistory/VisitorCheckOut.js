import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Dot from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/AntDesign'
import { Color, Fonts, Loader, showToastMessage, staticImage } from '../../Utils';
import Appurl from "../../API/Constant"
import moment from 'moment';

export default function VisitorCheckOut({ data, navigation, onToggle, closeMenuOption, active, refreshPage = () => { }, }) {

    const [loading, setLoading] = useState(false)
    const checkOut = () => {
        setLoading(true)
        console.log(`${Appurl.VISITORCHECKOUT}${data?.id}/`);
        fetch(`${Appurl.VISITORCHECKOUT}${data?.id}/`, {
            method: 'POST',
            headers: { Authorization: `Token ${"2be804f7bb59c6dccdb12f03356e8a9be16c51f8"}` },
        }).then(res => res.json())
            .then(response => {
                console.log("responseCheckOIUT", response);
                if (response?.detail == "checkout updated") { "checkout done" }
                refreshPage()

            }).catch(e => showToastMessage('Something went wrong'))
            .finally(e => setLoading(false))
    }
    return (
        <Pressable style={styles.Maincontainer}>
            {loading && <Loader size={'small'} color={'#000'} />}
            <View style={styles.container}>
                <Image source={{ uri: data?.image ? data?.image : staticImage }} style={styles.imageTop} />
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.title}>{data?.visitor_name}</Text>
                    <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                        <Text style={styles.desc}>Check-In - </Text>
                        <Text style={{ marginLeft: 2, fontFamily: Fonts.RobotoRegular, fontSize: 13 }}>{data?.visit_date}, {data?.visit_time}</Text>
                    </View>
                    {(data?.visited_date == null) ?
                        <></>
                        :
                        <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                            <Text style={styles.desc}>Check-Out - </Text>
                            <Text style={{ marginLeft: 2, fontFamily: Fonts.RobotoRegular, fontSize: 13 }}>{data?.visited_date ? moment(data?.visited_date).format("MMMM Do YYYY, h:mm:ss a") : ''}</Text>
                        </View>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.HistoryButton}
                onPress={checkOut}>
                <Text style={{ color: '#fff', fontSize: 12 }}>CheckOut</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.topCheckOutButton}
                onPress={checkOut}>
                <Text style={{ fontFamily: Fonts.RobotoMedium, fontSize: 13, color: '#010B6C' }}>CheckOut</Text>
            </TouchableOpacity> */}
            {/* <Text style={styles.toptimetext}>
                checkOutTime
            </Text> */}

            <TouchableOpacity onPress={onToggle}
                style={styles.VerticalDot}>
                <Dot name="dots-three-vertical" size={18} color='#010B6C' />
            </TouchableOpacity>

            {active && <View style={styles.menu}>
                <TouchableOpacity style={styles.closeMenu} onPress={closeMenuOption}>
                    <Icons name="closecircleo" size={18} color='#010B6C' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditHomeScreen", { VisitorId: data?.id })}
                    style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 7, paddingHorizontal: 10 }} >
                    <Icons name="edit" size={18} color='#010B6C' style={{ paddingRight: 7 }} />
                    <Text style={{ fontSize: 14, color: 'black', fontFamily: Fonts.RobotoRegular, }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 10, paddingHorizontal: 10 }} >
                    <Icons name="delete" size={18} color='#010B6C' style={{ paddingRight: 7 }} />
                    <Text style={{ fontSize: 14, color: 'black', fontFamily: Fonts.RobotoRegular, }}>Delete</Text>
                </TouchableOpacity>
            </View>}
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
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 7,
    },
    title: {
        fontSize: 15,
        paddingLeft: 10,
        color: "#000",
        fontFamily: Fonts.RobotoMedium,
    },
    desc: {
        color: "black",
        paddingLeft: 10,
        fontFamily: Fonts.RobotoRegular,
        fontSize: 13
    },
    ButtonText: {
        marginLeft: 10,
        marginTop: 5
    },
    topCheckOutButton: {
        position: 'absolute',
        top: 8,
        right: 10,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        // paddingTop: 5,
        borderWidth: 1,
        padding: 1,
        borderRadius: 4,
        borderColor: Color.fb
    },
    VerticalDot: {
        position: 'absolute',
        top: 40,
        right: 5,
    },
    menu: {
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        position: 'absolute',
        top: 0,
        right: 10,
        width: 100,
        height: 60
    },
    closeMenu: {
        position: 'absolute',
        top: -8,
        right: -8,
    },
    HistoryButton: {
        paddingHorizontal: 17,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 13,
        marginLeft: 13,
        borderRadius: 15,
        backgroundColor: '#008080'
    }
}

)
