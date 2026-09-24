import React, { Component } from 'react'
import { StyleSheet, Dimensions, TextInput} from 'react-native'
import { COLORS } from 'DWcmn/Global'


//generic text input -- replaces native-base's <Input>
//prop value / defaultValue (controlled vs uncontrolled, same as TextInput)
//prop onChangeText(text)
//prop placeholder
//prop style .. overrides/extends the default text style
//prop multiline / numberOfLines
//prop keyboardType (e.g. 'numeric', 'email-address', 'phone-pad')
//prop autoFocus
//prop inputRef .. (component) => {} -- pass a ref callback if the parent needs to call .focus()
//prop ...rest -- any other TextInput prop passes through
export class PrjInput extends Component {
  render() {
    const { inputRef, style, multiline, ...rest } = this.props
    return (
      <TextInput
        ref={inputRef}
        style={[
          { color: COLORS.GC_PULLUP_TEXT, backgroundColor:'red'},
          multiline && styles.inputMultiline,style
        ]}
        placeholderTextColor={COLORS.GC_PULLUP_PLACEHOLDER}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...rest}
      />
    )
  }
}

const styles = StyleSheet.create({
inputMultiline: {
   minHeight: 80,
   paddingVertical: 8,
},
})
