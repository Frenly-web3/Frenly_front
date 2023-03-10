type IFollowUnfollowType = {
  color: string
  content: string
}

export interface IFollowButtonContent {
  followContent: IFollowUnfollowType
  unfollowContent: IFollowUnfollowType
}