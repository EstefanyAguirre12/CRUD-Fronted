import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
    </>
  );
};

export default LoginPage;
