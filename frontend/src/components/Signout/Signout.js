import React, { Fragment } from 'react'
import Footer from '../CommonComps/Footer'
import Header from '../CommonComps/Header'
import { useSelector } from 'react-redux'

const Signout = () => {
  const { isAuthenticated } = useSelector(state => state.user)

  return (
    <Fragment>
        <Header/>
        {!isAuthenticated ? <h5>You have successfully signed out!</h5>: <h5>-/-</h5>}
        <Footer/>
        </Fragment>
  )
}

export default Signout