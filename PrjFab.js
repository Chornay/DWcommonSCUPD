import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native'
import { Platform } from 'react-native'
import { Fab } from 'native-base'
import { Text } from 'react-native'
import GLOBALS from 'DWcmn/Global';
import { COLORS, ICONS } from 'DWcmn/Global'
import { strX } from 'DWcmn/I18n';
import { OrderStatusEnum } from 'DWcmn/Global';
import { PrjIcon } from 'DWcmn/PrjIconComponents'

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};


//generic single-button Fab -- replaces native-base's <Fab>
//prop icon .. id passed to PrjIcon
//prop color .. background color of the button
//prop position .. topRight (default) | topLeft | bottomRight | bottomLeft
//prop style .. optional style overrides
//prop onPress()

const FAB_POSITIONS = {
  topRight: { top: 20, right: 20 },
  topLeft: { top: 20, left: 20 },
  bottomRight: { bottom: 20, right: 20 },
  bottomLeft: { bottom: 20, left: 20 },
}

export class PrjFab extends Component {
  render() {
    const positionStyle = this.props.position
       ? { position: 'absolute', ...FAB_POSITIONS[this.props.position] }
       : null
    const sizeStyle = this.props.size === 'small' ? styles.fabButtonShapeSmall : styles.fabButtonShape
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          sizeStyle,
          positionStyle,
          { backgroundColor: this.props.color || COLORS.GC_MAP_FAB_SHOWALL },
          this.props.style
        ]}
        onPress={this.props.onPress}
      >
        {/* TODO remove static color */}
        <PrjIcon id={this.props.icon} color='white' />
      </TouchableOpacity>
    )
  }
}

//prop position .. topRight (default) | topLeft | bottomRight | bottomLeft
//prop mainIcon .. icon id for the main toggle button
//prop mainColor .. background color of the main button
//prop active .. whether the child actions are shown (controlled by parent)
//prop onToggleMain() .. called when the main button is pressed
//prop actions .. array of { icon, color, onPress }
export class PrjFabExpandable extends Component {
  render() {
    const position = this.props.position || 'topRight'
    return (
      <View style={[styles.fabGroupContainer, FAB_POSITIONS[position]]}>
        <PrjFab
          icon={this.props.mainIcon}
          color={this.props.mainColor}
          onPress={this.props.onToggleMain}
        />

        {this.props.active && this.props.actions.map((action, index) => (
          <PrjFab
            key={index}
            icon={action.icon}
            color={action.color}
            size="small"
            style={styles.fabChildSpacing}
            onPress={action.onPress}
          />
        ))}
      </View>
    )
  }
}

//prop position (default topRight) //NOTE bottom does not work in CmnAddressOrStopInput
//prop color (default COLORS.GC_MAP_FAB_SHOWALL)
//prop onPress()
export const PrjFabMapCurrPos = ({ 
  onPress, 
  color = COLORS.GC_MAP_FAB_SHOWALL, 
  position = "topRight" 
}) => (
  <PrjFab
    icon="MAP_SHOW_ALL"
    color={color}
    position={position}
    onPress={onPress}
  />
);


const styles = StyleSheet.create({


  fabButtonShape: {
    // position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  fabButtonShapeSmall: {
    width: 30,
    height: 30,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },

  fabGroupContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  fabChildButton: {
    width: 30,
    height: 30,
    borderRadius: 400 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
  fabChildSpacing: {
   marginTop: 10,
},
})

