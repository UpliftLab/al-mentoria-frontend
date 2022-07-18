import { userStatus } from './userSlice';

// returns false with error if redirect is needed
const statusHandling = (status) => {
  switch (status) {
    case userStatus.authenticated:
      return [true, null];
    case userStatus.rejected:
      return [false, 'Token verification failed, Please Login!'];
    case userStatus.unauthenticated:
      return [false, 'You need to login!'];
    default:
      return [true, null];
  }
};

export default statusHandling;
