import { Alert } from 'react-native'
import { strX } from 'DWcmn/I18n.js'


//FOLLOWING ARE TEST CASES TO EXERCISE:
// cmnAlertPopup()                                    // nothing shown, no crash
// cmnAlertPopup(null)                                // same
// cmnAlertPopup({})                                  // same (both empty, skipped)
// cmnAlertPopup({ text: 'text only' })               // message, no title
// cmnAlertPopup({ title: 'title only' })             // title, no message
// cmnAlertPopup({ text: null })                      // nothing shown
// cmnAlertPopup({ text: 42 })                        // shows "42"
// cmnAlertPopup({ text: new Error('boom') })         // shows "Error: boom"
// cmnAlertPopup({ i18n: 'cmnNEW.MsgSystemUnavailable', titleI18n: 'cmn.OK' })  // real keys
// cmnAlertPopup({ i18n: 'no.such.key' })             // see below
// cmnAlertPopup({ text: 'tap outside', cancelable: true })  // dismisses on outside tap

// options:
//   titleI18n or title (optional)
//   i18n or text
//   cancelable (default false) true means can be dismissed by clicking outside
//                              false means they have to press the OK
//NOTE we ignore a popup without title or text
export function cmnAlertPopup(options) {
   const { titleI18n, title, i18n, text, cancelable=false } = options ?? {}
   const titleStr = toStr(titleI18n ? strX(titleI18n) : title)
   const textStr = toStr(i18n ? strX(i18n) : text)

   if (!titleStr && !textStr) return

   Alert.alert(
      titleStr,
      textStr,
      [
         {
            text: strX('cmn.OK')
         }
      ],
      { cancelable: cancelable }
   )
}//end cmnAlertPopup

//null/undefined become '', strings pass through, anything else is stringified (an Error becomes 'Error: message')
function toStr(value) {
   if (value == null) return ''
   return typeof value === 'string' ? value : String(value)
}

