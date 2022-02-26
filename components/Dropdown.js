import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Dropdown = () => {
  return (
    <View st>
      <TouchableOpacity>
        <Text>Dropdown</Text>
        <Text><Ionicons name='caret-down-outline' /></Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity>
          <Text>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Option 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Dropdown