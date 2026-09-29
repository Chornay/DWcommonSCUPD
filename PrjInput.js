import React, { Component } from 'react'
// import React, { useRef, useState } from 'react'
import { useRef, useState } from 'react'
import { StyleSheet, Dimensions, View, Text, TextInput } from 'react-native'
import { COLORS } from 'DWcmn/Global'


//generic text input -- replaces native base's <Input>
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
          { color: COLORS.GC_PULLUP_TEXT },
          multiline && styles.inputMultiline, style
        ]}
        placeholderTextColor={COLORS.GC_PULLUP_PLACEHOLDER}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...rest}
      />
    )
  }
}

export function PrjLabelledInput({ label, field, onEndEditing }) {
  const valueRef = useRef(field);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingLeft: 10,
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <TextInput
        defaultValue={field}
        style={{ justifyContent: 'center', alignItems: 'center', padding: 0, color: 'black' }}
        onChangeText={(val) => (valueRef.current = val)}
        onEndEditing={async () => await onEndEditing(valueRef.current)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputMultiline: {
    minHeight: 80,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
})
