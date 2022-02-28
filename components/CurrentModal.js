import { View, Text, Modal, TouchableOpacity, TextInput, BackHandler, ScrollView, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useContext, useState } from 'react'
import { myContext } from '../App';

const CurrentModal = ({ modalVisible, setModalVisible, currentModalCard }) => {

    const { editHandler, deleteHandler } = useContext(myContext)
    //for edit text 
    const [editText, setEditText] = useState(false);
    const [text, setText] = useState('');

    return (
        <Modal visible={modalVisible} animationType='fade' transparent={true} onRequestClose={() => { setEditText(false); setModalVisible(false) }}>
            <ScrollView style={styles.modal}>
                {/* show the card in arrOfCards on modalKey index */}
                <View key={currentModalCard.key} style={styles.card}>
                    <Text style={styles.cardTitle}>{currentModalCard.title}</Text>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoText}>{currentModalCard.mood}</Text>
                        <Text style={styles.cardInfoText}>{currentModalCard.key}</Text>
                    </View>

                    {/* default modal card text shown, hides when edit button is pressed, show TextInput when edit button is pressed */}
                    {editText ? (
                        <TextInput style={styles.editText} multiline={true} textAlignVertical='top' onChangeText={(txt) => setText(txt)} value={text} maxLength={1000} />

                    ) : (
                        <Text style={styles.cardText}>
                            {currentModalCard.text}
                        </Text>
                    )}

                    {/* showing different buttons depending on edit */}
                    {editText ? (
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => { editHandler(currentModalCard, text); setEditText(false); setModalVisible(false) }}>
                                <Text><Ionicons name='save-outline' size={30} color='lightgreen' /></Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => { setText(currentModalCard.text); setEditText(true) }}>
                                <Text><Ionicons name='create-outline' size={30} color='#523A28' /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { deleteHandler(currentModalCard.key); setModalVisible(false); }} >
                                <Text><Ionicons name='trash-outline' size={30} color='#523A28' /></Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#E4D4C8',
        flex: 1
    },
    pageTitle: {
        fontSize: 25,
        textAlign: 'center',
        color: '#523A28',
        margin: 20,
        fontWeight: 'bold'
    },
    card: {
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#A47551'
    },
    cardTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardInfoText: {
        color: '#D0B49F',
        fontSize: 17,
        marginTop: 5
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'justify'
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    editText: {
        fontSize: 20,
        marginVertical: 20,
        backgroundColor: 'white',
        color:'black',
        borderRadius: 10
    }
})

export default CurrentModal