import React from 'react';
import { View, Switch, Platform } from 'react-native';
import { COLORS } from 'DWcmn/Global';

//prop checked
//prop onPress
//prop disabled
//prop trackColorFalse
//prop trackColorTrue
//prop thumbColorFalse
//prop thumbColorTrue
export function PrjSliderSwitch({ 
   checked, 
   onPress, 
   disabled,
   trackColorTrue = COLORS.GC_SWITCH_DISABLE,
   trackColorFalse = COLORS.GC_SWITCH_DISABLE,
   thumbColorTrue = COLORS.GC_THEME_DARK,
   thumbColorFalse = COLORS.GC_ABS_WHITE
}) {
   // Move the switch align with Count button...original switch on and off position differently 
   // Align switch with plus and minus button
   let flexEndAndroid = checked ? 15 : 0;
   let flexEndIOS = checked ? 8 : 8;

   return (
      // use left to move to the right because alignItem:'flex-end' doesn't do it
      <View style={{ right: Platform.OS === 'ios' ? flexEndIOS : flexEndAndroid }}>
         <Switch
            // We can't apply any style to trackColor eg.shadow style 
            trackColor={{ true: trackColorTrue, false: trackColorFalse }}
            thumbColor={checked ? thumbColorTrue : thumbColorFalse}
            onValueChange={(val) => {
               onPress(val);
            }}
            value={checked}
            style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 1.25 }, { scaleY: 1.25 }] : [{ scaleX: 2.00 }, { scaleY: 1.75 }] }}
            disabled={disabled}
         />
      </View>
   );
}
