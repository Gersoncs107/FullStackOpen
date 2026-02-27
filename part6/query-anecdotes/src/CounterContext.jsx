import { createContext, useReducer, useContext } from 'react'

const CounterContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const CounterContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <CounterContext.Provider value={[notification, dispatch]}>
      {children}
    </CounterContext.Provider>
  )
}

export const useNotification = () => {
  const [, dispatch] = useContext(CounterContext)

  const setNotification = (message) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return setNotification
}

export default CounterContext