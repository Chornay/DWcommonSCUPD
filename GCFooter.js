import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FooterGBC, FooterLeft, FooterBody, FooterRight } from 'DWcmn/PrjNativeBase'
import { useNavigation } from 'DWcmn/PrjNav5Wrapper'

import { COLORS } from 'DWcmn/Global'

import { PrjIconButton } from 'DWcmn/Prj'

//20230520 using Footer,Left etc rather than the deprecated Prj wrapper versions
//20230520 replaced PRJ_STYLES.footerBkg with a color property (icons want transparent background)

//GCFooter generic footer displays children with optional back and hide
//prop hide if the action is not enabled (no display)
//prop back to do a navigation goBack
// or  back() 
//prop style
//prop height
//prop color
//NOTE this footer is coloured with the default project colour
//     to display simple icons in the footer use GCFooterTransparent

function GCFooter({ hide, height, back, color, style, children }) {
   const navigation = useNavigation()

   if (hide) { return null }

   const finalHeight = height || 60
   const finalColor = color || COLORS.GC_FOOTER_BKG

   if (!back) {
      return (
         //20250822 added SafeAreaView - edges for pusing up footer above navigation bar at the bottom 
         //...Otherwise footer hides navigation bar at the bottom for new samsung devices
         <SafeAreaView edges={['bottom']} style={{ backgroundColor: finalColor, paddingTop: 0 }}>
            <FooterGBC style={[{ height: finalHeight, backgroundColor: finalColor }, style]}>
               {children}
            </FooterGBC>
         </SafeAreaView>
      )
   }
   else {
      return (
         //20250822 added SafeAreaView - edges for pusing up footer above navigation bar at the bottom 
         //...Otherwise footer hides navigation bar at the bottom for new samsung devices
         <SafeAreaView edges={['bottom']}>
            <FooterGBC style={[{ height: finalHeight, backgroundColor: finalColor }, style]}>
               <FooterLeft>
                  <PrjIconButton id='ARROW_BACK_FOOTER'
                     onPress={() => {
                        if (typeof back === 'function') { back() }
                        else { navigation.goBack() }
                     }} />
               </FooterLeft>
               <FooterBody>{children}</FooterBody>
               <FooterRight />
            </FooterGBC>
         </SafeAreaView>
      )
   }
}//end GCFooter

export default GCFooter