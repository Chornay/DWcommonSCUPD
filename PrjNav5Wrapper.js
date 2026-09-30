import { useNavigation as useNavigationV4 } from 'react-navigation-hooks'

//v4 shim for the v5 useNavigation()/useRoute() hooks, so screens can be
//written in final v5 shape now while we're still on react-navigation v4.
//
//MIGRATION TO V5: change the single import line above to:
//   import { useNavigation, useRoute } from '@react-navigation/native'
//and delete the two function bodies below (keep the two export lines,
//or just re-export directly - see commented alternative below).
//AND don't forget to uninstall react-navigation-hooks #######################

export function useNavigation() {
   return useNavigationV4()
}

export function useRoute() {
   return useNavigationV4().state   //v4 shape: { key, routeName, params }
}

//AFTER MIGRATION, this file can become a one-line permanent passthrough
//(no changes needed at any call site) or be deleted entirely with an
//F2 rename of these two exports across the project:
//
//export { useNavigation, useRoute } from '@react-navigation/native'