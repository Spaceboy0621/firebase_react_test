// **  Initial State
const initialState = {
  userData: {},
  exercises: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXERCISES':
      return { ...state, exercises: action.exercises }
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    default:
      return state
  }
}

export default authReducer
