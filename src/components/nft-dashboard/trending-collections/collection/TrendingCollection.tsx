import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@app/components/common/Avatar/Avatar';
import { TrendingActivity } from '@app/api/activity.api';
import * as S from './TrendingCollection.styles';

export const TrendingCollection: React.FC<TrendingActivity> = ({
  id,
  name,
  image,
  directorImg,
  director,
  genre,
  year,
  setIsMiddleModalOpen,
  setName,
  setDirector,
  setGenre,
  setYear,
  setId,
  setImage,
  setDirectorImg,
}) => {
  const { t } = useTranslation();

  // get state from parent component
  return (
    <>
      <S.Card padding={0} $img={image[0].thumbUrl}>
        <S.CollectionImage src={image[0].thumbUrl} alt="nft" />
        <S.BidButton
          type="ghost"
          onClick={() => {
            setIsMiddleModalOpen(true),
              setName(name),
              setDirector(director),
              setGenre(genre),
              setYear(year),
              setId(id),
              setImage(image),
              setDirectorImg(directorImg);
          }}
        >
          Edit
        </S.BidButton>
        <S.NftCollectionInfo>
          <S.AuthorAvatarWrapper>
            <Avatar shape="circle" size={64} src={directorImg[0].thumbUrl} alt="" />
          </S.AuthorAvatarWrapper>
          <S.InfoRow>
            <S.Title level={5}>{name}</S.Title>
          </S.InfoRow>
          <S.InfoRow>
            <S.OwnerText>
              {t('nft.by')} {director}
            </S.OwnerText>
          </S.InfoRow>
          <S.InfoRow>
            <S.OwnerText>{genre}</S.OwnerText>
            <S.USDText>{year}</S.USDText>
          </S.InfoRow>
        </S.NftCollectionInfo>
      </S.Card>
    </>
  );
};
