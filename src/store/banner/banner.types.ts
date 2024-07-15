import { BANNER_ITEM } from '@/utils/api/banner'

export enum BannerActionTypes {
  GET_BANNERS_REQUESTED = 'banner/getBannersRequested',
  GET_BANNERS_SUCCESSFUL = 'banner/getBannersSuccessful',
  GET_BANNERS_FAILED = 'banner/getBannersFailed',
  GET_BANNERS = 'banner/getBanners',
}

export interface BannerState {
  banners: BANNER_ITEM[]
  bannersLoading: boolean
  bannersError: string | null
}

export type GetBannersAction = { type: BannerActionTypes.GET_BANNERS }
