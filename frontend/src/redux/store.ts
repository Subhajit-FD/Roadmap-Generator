import { configureStore } from '@reduxjs/toolkit'
import NavigationReducer from './features/navigation/navigationSlice'
import AuthenticationReducer from './features/authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    navlinks: NavigationReducer,
    authentication: AuthenticationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch