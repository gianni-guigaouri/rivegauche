import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyB258_4hJ863o2fXTwt16DZpPgRnGDRnG0',
  authDomain: 'rivegauche-461e5.firebaseapp.com',
  databaseURL: 'https://rivegauche-461e5.firebaseio.com',
  projectId: 'rivegauche-461e5',
  storageBucket: 'rivegauche-461e5.appspot.com',
  messagingSenderId: '1082510342434',
  appId: '1:1082510342434:web:1d3bc394c41a6cdd46cd7b',
  measurementId: 'G-THYX0Z7RL9'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
