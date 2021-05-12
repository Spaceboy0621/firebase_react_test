// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig
import firebase from '../../../firebase'

export const getExercises = () => {
  return async (dispatch, getState) => {
    await firebase
    .firestore()
    .collection("trainingPlans")
    .onSnapshot(snapshot => {
      const exercises = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch({
        type: 'GET_EXERCISES',
        exercises
      })
    })
  }
}

export const addExercise = (document) => {
  return dispatch => {
    firebase
    .firestore()
    .collection("trainingPlans")
    .add(document)
    .then(ref => {
      console.log("Added document with ID: ", ref)
    })
    dispatch(getExercises())
  }
}

export const deleteExercise = (id) => {
  return dispatch => {
    firebase
      .firestore()
      .collection("trainingPlans")
      .doc(id)
      .delete()
    dispatch(getExercises())
  }
}

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
