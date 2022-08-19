import { RootState } from '@redux/store';

const FbUserInfoSelect = (state: RootState) => state.fbUserInfo;

const FbUserInfoSelectors = {
  FbUserInfoSelect,
};

export default FbUserInfoSelectors;
