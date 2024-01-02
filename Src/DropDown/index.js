import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Child from './Child'
import axios from 'axios'
import CustomText from '../CustomThings/CustomText'

const index = () => {

    const [data, setData] = useState([])
    const [selectedFinalText, setSelectedFinalText] = useState('')
    // console.log(data?.address?.city);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const url = 'https://jsonplaceholder.typicode.com/users'
            const response = await axios.get(url)
            setData(response?.data)
        }
        catch (error) {
            console.log("Error", error)
        }
    }

    const selectedTextFunction = (data) => {
        setSelectedFinalText(data)
        console.log("selectedData", data);
    }
    return (
        <View>
            <CustomText Tittle={selectedFinalText} Style={{ alignSelf: "center", fontSize: 30, marginTop: 30 }} />
            <Child data={data} selectedText={selectedTextFunction} />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})