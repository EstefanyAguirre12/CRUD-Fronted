import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by Estefany Aguirre. Based on{' '}
        <a href="https://ant.design/" target="_blank" rel="noreferrer">
          Ant-design.
        </a>
      </S.Text>
      <S.Icons>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <LinkedinOutlined />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
