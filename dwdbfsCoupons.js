import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import remoteConfig from '@react-native-firebase/remote-config';
import { cmnAlertPopup } from 'DWcmn/cmnAnnunciationFunctions'

//20250721 use remote_config to retrieve available coupons


//get all the coupons for a specific customer
//note that we add the document Id to the coupon data so we can delete/update it
//TODO we really should change query to include isUsed ... and build the index for it
export async function dwdbfsCouponsGetForCustomer(custId) {

   let querySnapshot = await firestore().collection("Coupons")
      .where("custId", "==", custId)
      .get()
   let localCoupons = [];
   querySnapshot.forEach((doc) => {
      const couponData = doc.data()
      couponData.docId = doc.id
      if (!couponData.isUsed) localCoupons.push(couponData)
   })
   return localCoupons;
} //end dwdbfsCouponsGetForCustomer

//writes a new coupon for a customer. Add the document id to the coupon
export async function dwdbfsCouponsAddNew(coupon) {
   try {
      const couponRef = await firestore().collection("Coupons").add(coupon)
      await couponRef.update({ id: couponRef.id })
      return (couponRef)
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }
}

//deletes a coupon using the doc id
//returns true iff successful
//A UTILITY FUNCTION THAT SHOULD SELDOM BE USED
export async function dwdbfsCouponsDelete(coupon) {
   try {
      let ref = firestore().collection('Coupons').doc(coupon.id)
      await ref.delete()
      return true
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return false
   }
}

export async function getRemoteStorage(key) {

   let parameterString = null
   try {
      await remoteConfig().setConfigSettings({
         minimumFetchIntervalMillis: 0, // force fetch every time DEBUG
      });
      await remoteConfig().fetchAndActivate();
      return await remoteConfig().getValue(key).asString();
   }
   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }
}

//get all available coupons
export async function dwdbfsCouponsGetAvailable(selShopId) {

   const couponsAsString = await getRemoteStorage('CouponAllAvailable')

   const metaData = JSON.parse(couponsAsString)
   let coupons = []

   for (const single of metaData) {

      //we have to calculate expiryDate from the expiry property
      const { expiry: expiryString,
         effective: effectiveString,
         issueDate: issueString,
         ...coupon } = single

      //if the coupon is for a certain shop and it is not the customers then ignore it
      if (coupon.shopId && selShopId != coupon.shopId) {
         continue;
      }

      //calculate the effective date
      //either a correctly specified date (snapped to start of day) or today start of day
      let effectiveDate
      if (effectiveString == null) {
         effectiveDate = new Date()
         effectiveDate.setHours(0, 0, 0, 0)
      }
      else {
         const d = new Date(effectiveString)
         if (!isNaN(d.getTime())) {
            d.setHours(0, 0, 0, 0)
            effectiveDate = d
         }
         else {
            cmnAlertPopup({ text: `invalid effective date <${effectiveString}>, coupon ignored` })
            continue //////////////ignore this coupon
         }
      }

      //calculate expiry date
      //null/undefined = never expires
      //an integer = number of days after effective date (end of day)
      //otherwise treated as a date string, snapped to end of day
      let expiryTime
      if (expiryString == null) {
         expiryTime = null
      }
      else if (/^\d+$/.test(expiryString)) {//they have specified the length of validity in days
         //start with effective date and then add the duration in days
         //but then we want end of day on that day
         expiryTime = new Date(effectiveDate);
         expiryTime.setDate(effectiveDate.getDate() + Number(expiryString));
         expiryTime.setHours(23, 59, 59, 999);
      }
      else {
         const d = new Date(expiryString)
         if (!isNaN(d.getTime())) {
            d.setHours(23, 59, 59, 999)
            expiryTime = d
         }
         else {
            cmnAlertPopup({ text: `invalid expiry <${expiryString}>, coupon ignored` })
            continue //////////////ignore this coupon
         }
      }

      //calculate issue date (will almost always be undefined == current time)
      let issueDate
      if (issueString == null) {
         issueDate = new Date()
      }
      else {
         const d = new Date(issueString)
         if (!isNaN(d.getTime())) {
            issueDate = d
         }
         else {
            cmnAlertPopup({ text: `invalid issue date <${issueString}>, coupon ignored` })
            continue //////////////ignore this coupon
         }
      }
      coupon.expiryDate = expiryTime
      coupon.effectiveDate = effectiveDate
      coupon.issueDate = issueDate
      coupons.push(coupon)
   }
   return coupons;
} //end dwdbfsCouponsGetAvailable

//add a welcome coupon to a (new) customer
export async function dwdbfsCouponsAddWelcome(custId) {

   const welcomeCouponAsString = await getRemoteStorage('CouponWelcome')

   const welcomeCoupon = JSON.parse(welcomeCouponAsString)
   welcomeCoupon.custId = custId
   try {
      const couponRef = await firestore().collection("Coupons").add(welcomeCoupon)
      await couponRef.update({ id: couponRef.id })
      return (couponRef)
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }


} //end dwdbfsCouponsAddWelcome
