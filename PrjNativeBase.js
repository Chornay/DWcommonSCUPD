import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


//A few changes from the Native Base behaviour
// Left - ListItemLeft
// Body - ListItemBody
// Right - ListItemRight
// ListItem with divider is ListItemDivider
// ListItem thumbnail is not supported
// AND ListItem style applies to the content NOT the container 
//     THIS MAY NOT BE CORRECT 
//     if you need to do so add a containerStyle prop
export function ListItemGBC({ style, button, onPress, noBorder, disabled, children }) {
   const containerStyle = [
      styles.container,
      noBorder && styles.noBorder,
   ];
   const innerStyle = [styles.content, style];

   if (button) {
      return (
         <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.6}
         >
            <View style={innerStyle}>{children}</View>
         </TouchableOpacity>
      );
   }

   return (
      <View style={containerStyle}>
         <View style={innerStyle}>{children}</View>
      </View>
   );
}

export function ListItemLeft({ style, children }) {
   return <View style={[styles.left, style]}>{children}</View>;
}

export function ListItemBody({ style, children }) {
   return <View style={[styles.body, style]}>{children}</View>;
}

export function ListItemRight({ style, children }) {
   return <View style={[styles.right, style]}>{children}</View>;
}

export function FooterGBC({ style, children }) {
   return <View style={[footerStyles.footer, style]}>{children}</View>;
}

export function FooterLeft({ style, children }) {
   return <View style={[footerStyles.left, style]}>{children}</View>;
}

export function FooterBody({ style, children }) {
   return <View style={[footerStyles.body, style]}>{children}</View>;
}

export function FooterRight({ style, children }) {
   return <View style={[footerStyles.right, style]}>{children}</View>;
}

const styles = StyleSheet.create({
   container: {
      minHeight: 40,
      paddingVertical: 0, //native base was 6, we changed for more compact lines
      borderBottomWidth: 0.5,
      borderColor: '#ccc',
   },
   noBorder: {
      borderBottomWidth: 0,
   },
   content: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   left: {
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'flex-start',
   },
   body: {
      flex: 1,
      justifyContent: 'center',
   },
   right: {
      marginLeft: 'auto',
   },
});

const footerStyles = StyleSheet.create({

   footer: {
      justifyContent: 'space-evenly',// 20220810 used to be space-between
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 0, //native base seems to set elevation to 3 by default .. we don't want
   },
   body: {
      flex: .8,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   left: {
      flex: .1
   },
   right: {
      flex: .1
   },
});
