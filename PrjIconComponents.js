import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
// import { Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { GCI18n } from 'DWcmn/Gc'
import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global'
import { ICONS, ICONS_WITH_TEXT } from 'DWcmn/Global'
import { PRJ_STYLES } from './PrjStyles';
import { getIconCodeForAction } from 'DWcmn/PrjCmnFunctions'


// Maps every "type" string used in the ICONS table (Global.js) to its
// react-native-vector-icons set. If you add a new icon to ICONS with a
// type not listed here, add the import + entry above/below.
const ICON_SETS = {
   MaterialIcons,
   MaterialCommunityIcons,
   Ionicons,
   FontAwesome,
   FontAwesome5,
   Entypo,
}

export class PrjIcon extends Component {
   render() {
      const id = ICONS[this.props.id]
      if (id) {
         let color
         if (this.props.color) { color = this.props.color }
         else if (id.color) { color = id.color }
         else { color = COLORS.GC_ICON }

         const IconSet = ICON_SETS[id.type]
         if (!IconSet) {
            console.warn(`PrjIcon: no icon set mapped for type "${id.type}" (id="${this.props.id}")`)
            return null
         }

         // native-base read size from style.fontSize; vector-icons wants an
         // explicit "size" prop, so pull fontSize out of whatever style was passed.
         const flatStyle = StyleSheet.flatten(this.props.style) || {}
         const size = flatStyle.fontSize || 24

         return (
            <IconSet
               name={id.name}
               size={size}
               color={color}
               style={this.props.style}
            />
         )
      }
      else {
         return null
      }
   } //end render
} //end PrjIcon

export function prjIconEditableBox() {
   return (
      <PrjIcon style={{ fontSize: 18 }} id='EDITABLE_BOX' />
   )
}

//prop 
//NOT USED YET 
export class PrjIconWithShadow extends Component {
   render() {
      return (
         <View style={[styles.shadowStyle, this.props.style]}>
            {this.props.children}
         </View>
      )
   } //end render
} //end PrjIconBK

//20250526 replaced native-base button
export class PrjIconWithText extends Component {
   render() {

      //if the passed icon code is invalid use CODE_UNDEF (gives us ? for icon and text)
      let iconCode = this.props.code
      if (!iconCode || !ICONS_WITH_TEXT[iconCode]) { iconCode = "CODE_UNDEF" }

      const entry = ICONS_WITH_TEXT[iconCode]
      const iconId = entry.icon
      const i18n = entry.i18n
      const colorStyle = entry.color ? { color: entry.color } : null
      return (
         <TouchableOpacity
            style={styles.iconWithTextButton}
            onPress={this.props.onPress}
         >
            <PrjIcon style={[this.props.iconStyle, colorStyle]} id={iconId} />
            <GCI18n code={i18n} style={[this.props.textStyle, colorStyle, { textAlign: 'center' }]} />
         </TouchableOpacity>

      )
   }
}

//PrjIconForTileAction generates icon styled for an order (route) tile
//  that corresponds to an available action for the tile
//prop action (an action enum used to determine the icon to display)
//prop onPress
export class PrjIconForTileAction extends Component {

   render() {
      return (
         <PrjIconWithText
            code={getIconCodeForAction(this.props.action)}
            style={PRJ_STYLES.tileButtonBkg}
            iconStyle={PRJ_STYLES.tileButtonIcon}
            textStyle={PRJ_STYLES.tileButtonText}
            onPress={this.props.onPress}
         />
      )

   }
}//end PrjIconForTileAction


const styles = StyleSheet.create({
   shadowStyle: {
      backgroundColor: GLOBALS.COLOR.BTN_BK,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: .1,
      elevation: 5,
      shadowRadius: .8,
      borderRadius: 1000,
      padding: 10
   },
   iconWithTextButton: {
      flexDirection: 'column',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
   },
})
