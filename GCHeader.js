import React from 'react'
import { StyleSheet, Dimensions, Image, View, Platform, StatusBar } from 'react-native'
import { useNavigation } from 'DWcmn/PrjNav5Wrapper'
import { PRJ_STYLES } from './PrjStyles'
import { PrjIconButton } from './Prj'
import { PrjButtonWithConfirm } from 'DWcmn/PrjButtonWithConfirm'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { COLORS, GC_STD_MARGIN } from 'DWcmn/Global'

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {}

// Android: StatusBar.currentHeight is reliable and dynamic (varies by device/OS).
// iOS: no equivalent RN-core API pre-notch-detection; 44 covers modern notch devices,
// 20 covers older non-notch iPhones. Platform.OS check below approximates this —
// NOT dynamic-island-aware. Verify against your min supported iOS device.
//NOTE this is not used but looks interesting ###############
const STATUS_BAR_HEIGHT = Platform.select({
  android: StatusBar.currentHeight || 24,
  ios: Dimensions.get('window').height >= 812 ? 44 : 20, // rough notch heuristic
  default: 24,
})

const HEADER_HEIGHT = Platform.select({ ios: 44, android: 56, default: 56 })

//GCHeader is a header with limited styling abilities
//designed for Cust (back) and Cust order creation (cancel) but also
//  used by D&S
//It gives a title centered in the middle
//BIG NOTE .. it will also render children ... not sure if we have used that capability
//back() property gives a back arrow on the left
//       back gives goBack ... back() calls that function
//cancel property gives an X on the right
//       if confirmed then user will popToTop ... cancelling order
//OR
//optionsBurger() property gives a options burger on the right
//cancelConfirmI18n .. for the cancel confirmation .. used for rescheduling dialog
//prop titleI18n
//prop titleText   .... please use just one of titleI18n and titleText
//prop style (for the Body of the Header)
//prop titleStyle (for the Title in the Header)
//prop large to make a bigger title
//prop transparent
//prop iconColor
//prop noBottomPadding .. do not put the blank padding after the header
export default function GCHeader({ back, cancel, optionsBurger, cancelConfirmI18n, titleI18n, titleText, style, titleStyle, large, transparent, iconColor, iconStyle, image, noBottomPadding, children }) {
  const navigation = useNavigation()

  const bkg = transparent ? 'transparent' : COLORS.GC_HEADER_BKG
  const headerTextStyle = large ? PRJ_STYLES.headerTextLarge : PRJ_STYLES.headerText
  const finalIconColor = iconColor || COLORS.GC_HEADER_ICON

  return (
    <View>
      <View
        style={[
          styles.header,
          { backgroundColor: bkg, height: HEADER_HEIGHT },
          style,
        ]}
      >
        <View style={styles.left}>
          {back && (
            <PrjIconButton
              id="ARROW_BACK_HEADER"
              style={[PRJ_STYLES.headerIcon, { color: finalIconColor }, iconStyle]}
              onPress={() => {
                if (typeof back === 'function') { back() }
                else { navigation.goBack() }
              }}
            />
          )}
        </View>

        <View style={[styles.body, style]}>
          {titleI18n && (
            <GCI18n style={[headerTextStyle, titleStyle]} code={titleI18n} />
          )}
          {titleText && (
            <GCText style={[headerTextStyle, titleStyle]}>{titleText}</GCText>
          )}
          {image && (
            <Image
              style={{
                height: 30,
                justifyContent: 'center',
                alignSelf: 'center',
                resizeMode: 'contain',
                width: SCREEN_WIDTH * 0.6, //CAUSE THEY INSISTED!!
              }}
              source={image}
            />
          )}
          {children}
        </View>

        <View style={styles.right}>
          {cancel && (
            <PrjButtonWithConfirm
              icon="CANCEL_HEADER"
              buttonStyle={[PRJ_STYLES.headerIcon, iconStyle]}
              confirmI18n={cancelConfirmI18n || 'cstNEW.DiscardOrder'}
              onConfirm={() => { navigation.popToTop() }}
            />
          )}
          {optionsBurger && (
            <PrjIconButton
              id="BURGER"
              style={[PRJ_STYLES.headerIcon, { color: finalIconColor }, iconStyle]}
              onPress={() => { optionsBurger() }}
            />
          )}
        </View>
      </View>

      {!noBottomPadding && <View style={{ height: GC_STD_MARGIN }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    borderBottomWidth: 0,
  },
  left: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  body: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
})