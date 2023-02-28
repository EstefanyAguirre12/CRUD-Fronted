import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { AuthData } from '@app/api/auth.api';

const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';

httpApiMock.onPost('login').reply((config) => {
  const data: AuthData = JSON.parse(config.data || '');
});

httpApiMock.onPost('signUp').reply(200);

httpApiMock.onPost('forgotPassword').reply(200);

httpApiMock.onPost('verifySecurityCode').reply(200);

httpApiMock.onPost('setNewPassword').reply(200);
