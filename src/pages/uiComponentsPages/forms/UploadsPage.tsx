/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Upload, UploadDragger } from '@app/components/common/Upload/Upload';
import { Button } from '@app/components/common/buttons/Button/Button';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { useState } from 'react';
import axios from 'axios';
const DraggerIconWrapper = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
`;
const DraggerTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.bold};
`;
const DraggerDescription = styled.div`
  font-size: ${FONT_SIZE.md};
  padding: 0 1rem;
`;

const UploadsPage: React.FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(file);
  }
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:3001/movies',
    onChange: (info: any) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file.originFileObj);
        setFile2(URL.createObjectURL(info.file.originFileObj));
      }
      if (status === 'done') {
        axios.post('http://localhost:3001/movies', file2)
        message.success(t('uploads.successUpload', { name: info.file.name }));
      } else if (status === 'error') {
        message.error(t('uploads.failedUpload', { name: info.file.name }));
      }
    },
  };
  console.log("aaa"+file2);

  return (
    <>
      <PageTitle>{t('common.upload')}</PageTitle>
      <Col>
        <S.Card title={t('uploads.basic')}>
        <input type="file" onChange={handleChange} />
            <img src="http://localhost:3000/6a0a9c61-2038-4080-8229-e7f4c97ff7dc" />
  
          <Upload {...uploadProps}>
            <Button onChange={handleChange} icon={<UploadOutlined />}>{t('uploads.clickToUpload')}</Button>
            <img src={file2} />
          </Upload>
        </S.Card>
        <div>
            <img id="preview" src="" alt="image"/>
        </div>
        <S.Card title={t('uploads.directory')}>
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
            <Button icon={<UploadOutlined />}>{t('uploads.directory')}</Button>
          </Upload>
        </S.Card>
      </Col>
    </>
  );
};

export default UploadsPage;
