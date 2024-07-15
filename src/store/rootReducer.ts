import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/user.reducer'
import categoryReducer from './category/category.reducer'
import cakeFaceReducer from './cakeFace/cakeFace.reducer'
import optionReducer from './option/option.reducer'
import bannerReducer from './banner/banner.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cakeFace: cakeFaceReducer,
  option: optionReducer,
  banner: bannerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
