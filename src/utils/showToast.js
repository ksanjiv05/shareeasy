import {ToastAndroid} from 'react-native'

export const showToast=(msg)=>{
    ToastAndroid.show(msg,ToastAndroid.SHORT)
}

