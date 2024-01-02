import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fonts, Loader, staticImage } from '../Utils'
import Appurl from "../API/Constant"

const RegisteredUserScreen = ({ navigation, route }) => {
    const [visitorId, setVisitorId] = useState(route?.params?.VisitorId ? route?.params?.VisitorId : '');
    const [visitorData, setVisitorData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribesELLER = navigation.addListener('focus', () => {
            getVisitorData()
            return unsubscribesELLER;
        })
    }, [])

    const getVisitorData = async () => {
        setLoading(true)
        fetch(`${Appurl.VISITORDATA}${visitorId}/`, {
            method: 'GET',
            headers: { Authorization: `Token ${"2be804f7bb59c6dccdb12f03356e8a9be16c51f8"}` },
        }).then(res => res.json())
            .then(response => {
                if (response && response?.length !== 0) {
                    setVisitorData(response)
                }
                console.log("response--------", response);
            }).finally(e => {
                setLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            {loading && <Loader size={'small'} color={'#000'} />}
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>First Name</Text>
                <Text style={styles.LowerText}>{visitorData?.visitor_name}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Mobile Number</Text>
                <Text style={styles.LowerText}>{visitorData?.phone}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Gender</Text>
                <Text style={styles.LowerText}>{visitorData?.gender}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>ID Type</Text>
                <Text style={styles.LowerText}>{visitorData?.identity_type}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>ID Number</Text>
                <Text style={styles.LowerText}>{visitorData?.identity_number}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Selected Picture</Text>
                <Image source={{ uri: visitorData?.image ? visitorData?.image : staticImage }} style={{ width: 22, height: 22, borderRadius: 3 }} />
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Whom To Meet</Text>
                <Text style={styles.LowerText}>XYZ</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Purpose</Text>
                <Text style={styles.LowerText}>{visitorData?.purpose}</Text>
            </View>
            <View style={styles.mainConatiner}>
                <Text style={styles.upperText}>Check-In date & Time</Text>
                <Text style={styles.LowerText}>{visitorData?.visit_date} {visitorData?.visit_time}</Text>
            </View>
            {(visitorData?.visited_date == null) ?
                <></>
                :
                <View style={styles.mainConatiner}>
                    <Text style={styles.upperText}>Check-Out Time</Text>
                    <Text style={styles.LowerText}>{visitorData?.visited_date}</Text>
                </View>
            }
        </View>
    )
}

export default RegisteredUserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainConatiner: {
        backgroundColor: '#FAFAFA',
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#F3F3F3',
        paddingLeft: 15,
        paddingVertical: 5,
        marginTop: 20
    },
    upperText: {
        fontFamily: Fonts.RobotoMedium,
        fontSize: 14,
        color: '#010B6C',
        paddingBottom: 3
    },
    LowerText: {
        fontFamily: Fonts.RobotoRegular,
        fontSize: 16,
        color: 'grey'
    },
})