import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

export const CustomText = ({ Tittle, style }) => {
    return (
        <View style={style}>
            <Text>{Tittle}</Text>
        </View>
    )
}
// export const CustomText = ({ Tittle, style }) => {
//     return (
//         <View style={style}>
//             <Text>{Tittle}</Text>
//         </View>
//     )
// }

export const CustomButton = ({ Tittle, ButtonStyle, TextStyle, onpress, disabled }) => {
    return (
        <TouchableOpacity style={ButtonStyle} onPress={onpress} disabled={disabled}>
            <Text style={TextStyle}>{Tittle}</Text>
        </TouchableOpacity>
    )
}

export const CustomTextInput = ({ placeholder, TextInputStyle, value, ChangedText }) => {
    return (
        <TextInput
            placeholder={placeholder}
            style={TextInputStyle}
            value={value}
            onChangeText={ChangedText} />
    )
}

