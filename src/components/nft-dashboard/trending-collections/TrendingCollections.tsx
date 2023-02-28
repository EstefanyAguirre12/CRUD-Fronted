import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from '@app/components/common/Carousel/Carousel';
import { ViewAll } from '@app/components/nft-dashboard/common/ViewAll/ViewAll';
import { NFTCardHeader } from '@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader';
import { TrendingCollection } from '@app/components/nft-dashboard/trending-collections/collection/TrendingCollection';
import { useResponsive } from '@app/hooks/useResponsive';
import { getTrendingActivities, TrendingActivity } from '@app/api/activity.api';
import * as S from './TrendingCollections.styles';
import { UploadOutlined } from '@ant-design/icons';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Upload } from '@app/components/common/Upload/Upload';
import { notificationController } from '@app/controllers/notificationController';
import { Card } from '@app/components/common/Card/Card';
import * as M from '../../../pages/DashboardPages/DashboardPage.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import axios from 'axios';
import { Modal } from '@app/components/common/Modal/Modal';
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const normFile = (e = { fileList: [] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const TrendingCollections: React.FC = () => {
  const [trending, setTrending] = useState<TrendingActivity[]>([]);
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [currentForm] = BaseForm.useForm();
  const [editForm] = BaseForm.useForm();
  const [image, setImage] = useState();
  const [directorImg, setDirectorImg] = useState();
  const imageValue = (e = { fileList: [] }) => {
    if (Array.isArray(e)) {
      setImage(e);
    }
    setImage(e && e.fileList);
  };

  const imageDirector = (e = { fileList: [] }) => {
    if (Array.isArray(e)) {
      setDirectorImg(e);
    }
    setDirectorImg(e && e.fileList);
  };

  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      axios
        .post('http://localhost:3001/movies', values)
        .then((response) => {
          if (response.status === 200) {
            notificationController.success({ message: t('common.success') });
            getTrendingActivities().then((res) => setTrending(res));
            currentForm.resetFields();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values);
    }, 1000);
  };
  const updateData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      axios
        .put(
          `http://localhost:3001/movies/${id}`,
          JSON.parse(`{"name": "${name}", "director": "${director}", "genre": "${genre}", "year": "${year}" }`),
        )
        .then((response) => {
          if (response.status === 200) {
            axios
              .put(`http://localhost:3001/movies/${id}`, { image: image, directorImg: directorImg })
              .then((response) => {
                if (response.status === 200) {
                  getTrendingActivities().then((res) => setTrending(res));
                  editForm.resetFields();
                }
              });
            notificationController.success({ message: t('common.success') });
            getTrendingActivities().then((res) => setTrending(res));
            editForm.resetFields();
            setIsMiddleModalOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  const deleteData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      axios
        .delete(`http://localhost:3001/movies/${id}`)
        .then((response) => {
          if (response.status === 200) {
            notificationController.success({ message: t('common.success') });
            getTrendingActivities().then((res) => setTrending(res));
            setIsMiddleModalOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  const { mobileOnly, isTablet: isTabletOrHigher } = useResponsive();

  useEffect(() => {
    getTrendingActivities().then((res) => setTrending(res));
  }, []);
  const [isMiddleModalOpen, setIsMiddleModalOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [id, setId] = useState('');
  const trendingList = useMemo(() => {
    return {
      mobile: trending.map((item, index) => <TrendingCollection key={index} {...item} />).slice(0, 3),
      tablet: trending.map((item, index) => (
        <div key={index}>
          <S.CardWrapper>
            {/* send items and setIsMiddleModalOpen */}
            <TrendingCollection
              {...item}
              setIsMiddleModalOpen={setIsMiddleModalOpen}
              setName={setName}
              setDirector={setDirector}
              setGenre={setGenre}
              setYear={setYear}
              setId={setId}
              setImage={setImage}
              setDirectorImg={setDirectorImg}
            />
          </S.CardWrapper>
        </div>
      )),
    };
  }, [trending]);
  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <NFTCardHeader title="Movies">
        {isTabletOrHigher && (
          <Row align="middle">
            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickPrev()}>
                <LeftOutlined />
              </S.ArrowBtn>
            </Col>

            <Col>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickNext()}>
                <RightOutlined />
              </S.ArrowBtn>
            </Col>
          </Row>
        )}
      </NFTCardHeader>

      <S.SectionWrapper>
        {mobileOnly && trendingList.mobile}

        {isTabletOrHigher && trending.length > 0 && (
          <Carousel
            ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {trendingList.tablet}
          </Carousel>
        )}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
      {/* Add space */}
      <Modal
        title="Edit or Delete Movie"
        centered
        open={isMiddleModalOpen}
        onCancel={() => setIsMiddleModalOpen(false)}
        size="medium"
        footer={
          <>
            {' '}
            <Row>
              <Col xs={19} md={19}>
                <BaseButtonsForm.Item style={{ float: 'right' }}>
                  <Button type="primary" danger onClick={deleteData}>
                    Delete
                  </Button>
                </BaseButtonsForm.Item>
              </Col>
              <Col xs={1} md={1}></Col>
              <Col xs={4} md={4}>
                <BaseButtonsForm.Item style={{ float: 'right' }}>
                  <Button style={{ background: '#121430', border: '#121430' }} type="primary" onClick={updateData}>
                    Update
                  </Button>
                </BaseButtonsForm.Item>
              </Col>
            </Row>
          </>
        }
      >
        <BaseButtonsForm form={editForm} name="editForm" footer={<></>} isFieldsChanged={false}>
          <BaseForm.Item label="Name" rules={[{ required: true, message: 'Name required' }]}>
            <Input
              name="name"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </BaseForm.Item>
          <BaseForm.Item label="Director" rules={[{ required: true, message: 'Director required' }]}>
            <Input
              name="director"
              value={director}
              onChange={(e) => {
                e.preventDefault();
                setDirector(e.target.value);
              }}
            />
          </BaseForm.Item>
          <BaseForm.Item label="Genre" rules={[{ required: true, message: 'Genre required' }]}>
            <Input
              name="genre"
              value={genre}
              onChange={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            />
          </BaseForm.Item>
          <Row>
            <Col xs={24} md={8}>
              <BaseButtonsForm.Item
                name="image"
                label="Movie poster"
                valuePropName="fileList"
                getValueFromEvent={imageValue}
              >
                <Upload
                  name="logo"
                  listType="picture"
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  {' '}
                  <Button type="default" icon={<UploadOutlined />}>
                    {t('forms.validationFormLabels.clickToUpload')}
                  </Button>
                </Upload>
              </BaseButtonsForm.Item>
            </Col>
            <Col xs={24} md={8}>
              <BaseButtonsForm.Item
                name="directorImg"
                label="Director image"
                valuePropName="fileList"
                getValueFromEvent={imageDirector}
              >
                <Upload
                  name="logo"
                  listType="picture"
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button type="default" icon={<UploadOutlined />}>
                    {t('forms.validationFormLabels.clickToUpload')}
                  </Button>
                </Upload>
              </BaseButtonsForm.Item>
            </Col>
            <Col xs={24} md={8}>
              <BaseForm.Item label="Year" rules={[{ required: true, message: 'Year required' }]}>
                <Input
                  name="year"
                  value={year}
                  onChange={(e) => {
                    e.preventDefault();
                    setYear(e.target.value);
                  }}
                />
              </BaseForm.Item>
            </Col>
          </Row>
        </BaseButtonsForm>
      </Modal>
      <M.Space />
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} xl={24}>
          <Card id="validation form" title="Add new movie" padding="2.25rem">
            <BaseButtonsForm
              form={currentForm}
              {...formItemLayout}
              isFieldsChanged={isFieldsChanged}
              onFieldsChange={() => setFieldsChanged(true)}
              name="validateForm"
              footer={
                <BaseButtonsForm.Item style={{ float: 'right' }}>
                  <Button
                    style={{ background: '#121430', border: '#121430' }}
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Add
                  </Button>
                </BaseButtonsForm.Item>
              }
              onFinish={onFinish}
            >
              <BaseForm.Item name="name" label="Name" rules={[{ required: true, message: 'Name required' }]}>
                <Input />
              </BaseForm.Item>
              <BaseForm.Item
                name="director"
                label="Director"
                rules={[{ required: true, message: 'Director required' }]}
              >
                <Input />
              </BaseForm.Item>
              <BaseForm.Item name="genre" label="Genre" rules={[{ required: true, message: 'Genre required' }]}>
                <Input />
              </BaseForm.Item>
              <Row>
                <Col xs={24} md={8}>
                  <BaseButtonsForm.Item
                    name="image"
                    label="Movie poster"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Movie image required' }]}
                  >
                    <Upload
                      name="logo"
                      listType="picture"
                      beforeUpload={() => {
                        return false;
                      }}
                    >
                      {' '}
                      <Button type="default" icon={<UploadOutlined />}>
                        {t('forms.validationFormLabels.clickToUpload')}
                      </Button>
                    </Upload>
                  </BaseButtonsForm.Item>
                </Col>
                <Col xs={24} md={8}>
                  <BaseButtonsForm.Item
                    name="directorImg"
                    label="Director image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Director image required' }]}
                  >
                    <Upload
                      name="logo"
                      listType="picture"
                      beforeUpload={() => {
                        return false;
                      }}
                    >
                      <Button type="default" icon={<UploadOutlined />}>
                        {t('forms.validationFormLabels.clickToUpload')}
                      </Button>
                    </Upload>
                  </BaseButtonsForm.Item>
                </Col>
                <Col xs={24} md={8}>
                  <BaseForm.Item name="year" label="Year" rules={[{ required: true, message: 'Year required' }]}>
                    <Input />
                  </BaseForm.Item>
                </Col>
              </Row>
            </BaseButtonsForm>
          </Card>
        </Col>
      </Row>
    </>
  );
};
