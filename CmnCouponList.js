import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native' //CLAUDE StyleSheet imported but unused - pre-existing in the class version too, not something this conversion introduced
import CmnCouponTile from 'DWcmn/CmnCouponTile.js'


//prop coupons
//prop onSelect(coupon) [optional] defined iff parent wants to know the currently selected coupon
//prop readonly
export function CmnCouponList({ coupons, onSelect, readonly }) {

   const [isComponentInitialized, setIsComponentInitialized] = useState(false)
   const [selIndex, setSelIndex] = useState(-1)

   useEffect(() => {
      setIsComponentInitialized(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only, as the class did in componentDidMount
   }, [])

   if (!isComponentInitialized) { return null } //not finished our preparation yet

   return (
      <View>
         <FlatList
            data={coupons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
               return (
                  <CmnCouponTile
                     coupon={item}
                     isSelected={!readonly && index == selIndex}
                     onPress={() => {
                        if (selIndex != index) {//select a coupon
                           setSelIndex(index)
                           onSelect?.(item)
                        }
                        else { //deselect current
                           setSelIndex(-1)
                           onSelect?.(null)
                        }
                     }} //end onPress
                  />
               )
            }} //end renderItem 
         >
         </FlatList>
      </View>
   )

} //end CmnCouponList