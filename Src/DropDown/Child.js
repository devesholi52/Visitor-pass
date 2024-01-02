import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../CustomThings/CustomText'


const Child = ({ data, selectedText }) => {

    const [open, setOpen] = useState(false)

    const clickButton = () => {
        setOpen(true)
    }

    const selectedOne = (selected) => {
        selectedText(selected)
        setOpen(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => clickButton()}>
                <CustomText Tittle={"Please click to select"} Style={styles.buttonText} />
            </TouchableOpacity>

            {open && data.map((e) => {
                return (
                    <TouchableOpacity style={styles.innerContainer} onPress={() => selectedOne(e?.address?.city)}>
                        <Text>{e?.address?.city}</Text>
                    </TouchableOpacity>
                )
            })
            }
        </View>
    )
}

export default Child

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
        marginTop: 20
    },
    innerContainer: {
        borderBottomWidth: 1,
        padding: 5,
        marginTop: 30
    }
})