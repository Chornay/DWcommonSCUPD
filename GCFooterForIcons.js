import React from 'react'

import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { COLORS } from 'DWcmn/Global'

import GCFooter from './GCFooter';
import { PrjIconWithText } from './PrjIconComponents'

//20230520 using Footer,Left etc rather than the deprecated Prj wrapper versions
//20241009 added hide property to GCFooterForIcons .. to mimic behaviour of GCFooterButtons

//GCFooterWithSingleIcon
//GCFooterCmdIcon inside a GCFooterForIcons for convenience
//prop code for the iconWithText (default is NEXT_IS_OKAY)
//prop hide for the footer
//prop onPress for the button press
//NOTE no back //TODO check ... use is removed
//NOTE does NOT pass any other properties to GCFooter
export function GCFooterWithSingleIcon({ hide, back, code, onPress }) {
   return (
      <GCFooterForIcons hide={hide} back={back}>
         <GCFooterCmdIcon code={code || 'NEXT_IS_OKAY'} onPress={onPress} />
      </GCFooterForIcons>
   )
}

//GCFooterWithTwoIcons
//uses GCFooterCmdIcon inside a GCFooterForIcons left is onCancel, right onOkay
//prop onOkayCode gives icon with text for right hand selection
//prop onCancelCode gives icon with text for left hand selection
//prop onOkay for the right hand selection
//prop onCancel for the left hand selection
//prop disable hides the footer
//prop hide hides the footer
//NOTE that this component replace FooterButtonDouble which used disable prop
//     but others use hide ... we support both ... same meaning
export function GCFooterWithTwoIcons({ disable, hide, back, onCancel, onCancelCode, onOkay, onOkayCode }) {
   if (disable || hide) return (null)
   return (
      <GCFooterForIcons hide={hide} back={back}>
         {onCancel && <GCFooterCmdIcon code={onCancelCode || 'PREV_IS_CANCEL'} onPress={onCancel} />}
         {onOkay && <GCFooterCmdIcon code={onOkayCode || 'NEXT_IS_OKAY'} onPress={onOkay} />}
      </GCFooterForIcons>
   )
}

//GCFooterForIcons
//prop back to do a navigation goBack
// or  back() 
//prop hide
//NOTE does NOT pass any other properties to GCFooter
//TODO check color is NOT used in GCFooter
export function GCFooterForIcons({ disable, hide, back, children }) {
   if (disable || hide) return (null)
   return (
      <GCFooter back={back} color={COLORS.GC_FOOTER_ICON_BKG}>
         {children}
      </GCFooter>
   )
}

//prop code NOTE this is the key to the ICONS_WITH_TEXT table in Global
//prop onPress
export function GCFooterCmdIcon({ code, onPress }) {
   return (
      <PrjIconWithText
         code={code}
         iconStyle={PRJ_STYLES.footerIcon}
         textStyle={PRJ_STYLES.footerIconText}
         onPress={onPress}
      />
   )
}
