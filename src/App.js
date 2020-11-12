import React from 'react'
import { Switch, Route } from 'react-router-dom'
// COMPONENTS
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/signin-signup/signin-and-signup.component'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
// REDUX
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

// STYLE
import './App.css'

class App extends React.Component { 

  onsubscribeFromAuth = null

  componentDidMount () {
    const { setCurrentUser } = this.props
    this.onsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot(snapShot => {
          setCurrentUser({ 
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth) 
      }
    })
  }

  componentWillUnmount () {
    this.onsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header />
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)
