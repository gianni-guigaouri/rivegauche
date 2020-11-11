import React from 'react'
import { Switch, Route } from 'react-router-dom'
// COMPONENTS
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/signin-signup/signin-and-signup.component'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
// STYLE
import './App.css'

class App extends React.Component { 
  constructor (props) {
    super(props)
    this.state = {
      currentUser: null
    }
  }

  onsubscribeFromAuth = null

  componentDidMount () {
    this.onsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot(snapShot => {
          this.setState({ 
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            } 
          })
        })
      } else {
        this.setState({ currentUser: userAuth }) 
      }
    })
  }

  componentWillUnmount () {
    this.onsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />

          {/* <Route path='/shop/hats' component={HatsPage} /> */}
        </Switch>
      </div>
    )
  }
}

export default App
