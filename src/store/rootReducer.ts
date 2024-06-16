import { combineReducers } from '@reduxjs/toolkit'
import schoolReducer from './school/school.reducer'
import serviceReducer from './service/service.reducer'

const rootReducer = combineReducers({
  school: schoolReducer,
  service: serviceReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
