import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";

import { COLORS } from 'DWcmn/Global'
import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { strX } from 'DWcmn/I18n';
import { GCText, GCI18n } from 'DWcmn/Gc'
import { PrjInput } from 'DWcmn/Prj'

import { dwdbfsOrderUpdateItemPricing } from 'DWcmn/dwdbfsOrder'
import { prjUpdateOrderPricing } from 'DWcmn/prjUpdateOrderPricing'

//20221212 new modal formatting, major change
//20250512 change to do all repricing here and then update to DB


//prop isVisible
//prop dismiss called when we are done (ok or cancel)
//prop order
//prop index of item in array
export default class CmnPriceItemDialog extends Component {

   constructor() {
      super();
      this.state = {
         inputValue: null, //TODO not sure this really needs to be state variable
      };
   }

   render() {

      return (
         <Modal
            avoidKeyboard={true} //for ios modal doesn't hide under keyboard 
            isVisible={this.props.isVisible}
            onSwipeComplete={() => {
               this.props.dismiss()
            }}
            swipeDirection={["left", "right"]}
         >
            {/* <View style={PRJ_STYLES.modalPullup60}> */}
            <View style={[PRJ_STYLES.modalNew, this.props.style]}>
               {this.renderForm(this.props.order, this.props.index)}
            </View>
         </Modal>
      )
   } //end render

   renderForm(order, index) {

      let inputValue
      let initialValue
      let item = order.items[index]


      let prompt = strX('dict.' + item.name) + ' -\n'

      //set the prompt and initial for the current input type
      switch (item.unitType) {
         case 'kg':
            prompt += strX("cmn.question.Weight")
            initialValue = item.weight
            break;
         case 'pc':
            prompt += strX("cmn.question.How_many")
            initialValue = item.count
            break;
         case 'spc':
            prompt += strX("cmn.question.Price")
            initialValue = item.unitPrice
            break;
         default:
            prompt = strX("cmn.Error")
            initialValue = null
      } //end type switch

      return (
         <View style={{ flex: 1 }}>
            <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }}>
               <GCText title color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>{prompt}</GCText>
            </View>
            <View style={{ flex: .5 }}>
               <PrjInput
                  defaultValue={initialValue ? initialValue.toString() : null}
                  autoFocus={true}
                  placeholder={strX('cmnNEW.EnterDotDot')}
                  keyboardType={'numeric'}
                  onChangeText={(newValue) => {
                     inputValue = newValue.toString()
                     // this.setState({ inputValue:newValue.toString() })
                  }}
               />
            </View>

            <View style={{ flex: .2, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, alignItems: 'flex-start', paddingBottom: 10 }}>
               <TouchableOpacity
                  style={[PRJ_STYLES.buttonSideBySideOkay, { width: '30%' }]}
                  onPress={async () => {
                      //process this input according to its type.
                      //then recalculate pricing
                      //then update this item and all pricing fields in db
                     switch (item.unitType) {
                        case 'kg':
                           if (this.isValidWeight(inputValue)) {
                              let amount = Number(inputValue)
                              item.weight = amount
                              item.netPrice = amount * item.unitPrice;
                           }
                           break;
                        case 'pc':
                           if (this.isValidCount(inputValue)) {
                              let amount = Number(inputValue)
                              item.count = amount;
                              item.netPrice = amount * item.unitPrice;
                           }
                           break;
                        case 'spc':
                           if (this.isValidPrice(inputValue)) {
                              let amount = Number(inputValue)
                              item.unitPrice = amount;
                              item.netPrice = amount;
                           }
                        default:
                           break;
                     }//end type switch
                     item.isPriced = true
                     prjUpdateOrderPricing(order)
                     await dwdbfsOrderUpdateItemPricing(order, index) //TODO try
                     this.props.dismiss()
                  }}
               >
                  <GCI18n detail title inverse code="cmn.OKAY" />
               </TouchableOpacity>

               <TouchableOpacity
                  style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
                  onPress={() => { this.props.dismiss() }}>
                  <GCI18n detail title code="cmn.CANCEL" />
               </TouchableOpacity>
            </View>
         </View>

      )

   } //end renderForm

   isValidCount(integerAsString) {
      if (/^[+]\d+$/.test(integerAsString)) {
         return true
      }
      else {
         alert(strX("cmn.alert.Please_enter_valid_count"))
         return false
      }
   } //end isValidCount

   isValidPrice(priceAsString) {
      if (/^[+]?[0-9]+[\.]?[0-9]*$/.test(priceAsString)) {
         return true
      }
      else {
         alert(strX("cmn.alert.Please_enter_valid_price"))
         return false
      }
   } //end isValidPrice

   isValidWeight(WeightAsString) {
      if (/^[+]?[0-9]+[\.]?[0-9]*$/.test(WeightAsString)) {
         return true
      }
      else {
         alert(strX("cmn.alert.Please_enter_valid_weight"))
         return false
      }
   } //end isValidWeight

} //end CmnPriceItemDialog