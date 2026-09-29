import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { COLORS } from 'DWcmn/Global';

//prop size
//prop checked
//prop onPress
//prop disabled
//prop switchColorTrue
//prop switchColorFalse
//prop borderColor
export function PrjRadioButton({


   size = 20,
   checked,
   onPress,
   disabled = false,
   switchColorTrue = COLORS.GC_THEME_DARK,
   borderColor = COLORS.GC_CHECKBOX_BORDER
}) {
   return (
      <TouchableOpacity
         style={[
            styles.radioCircle,
            { 
               width: size,
               height: size,
               borderRadius: size / 2,
               borderColor: checked ? switchColorTrue : borderColor,
               // Fills completely when true, transparent background when false
               backgroundColor: checked ? switchColorTrue : 'transparent'
            }
         ]}
         activeOpacity={disabled ? 1 : 0.7}
         onPress={() => {
            if (!disabled) onPress();
         }}
         disabled={disabled}
      />
   );
}

const styles = StyleSheet.create({
   radioCircle: {
      borderWidth: 2.5,     
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
   }
});


