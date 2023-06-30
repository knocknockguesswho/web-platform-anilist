import { gql } from '@apollo/client';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';

export interface IMediaDetailQueryParams { id: number; }
export interface IMediaDetailResponse {
  media: IAnilistMedia;
}
export interface IMediaDetailRelationResponse {
  media: {relations: IAnilistMedia['relations']}
}

export interface IMediaDetailTagsResponse {
  media: { tags: IAnilistMedia['tags'] }
}

/**TODO:
 * Add new request:
 * - relations
 * - tags
 * - streamingEpisodes
 * - characters
 * - staff
 */

export const getMediaDetailRelations = gql`
  query ($id: Int) {
    media: Media(id: $id) {
      relations {
        nodes {
          id
          type
          status
          averageScore
          title {
            userPreferred
          }
          coverImage {
            large
            color
          }
        }
      }
    }
  }
`;

export const getMediaDetailTags = gql`
  query ($id: Int) {
    media: Media(id: $id) {
      tags {
        id
        name
        rank
        description
      }
    }
  }
`;

export const getMediaDetail = gql`
  query ($id: Int) {
    media: Media(id: $id) {
      id
      type
      title {
        userPreferred
      }
      description(asHtml: true)
      bannerImage
      coverImage {
        large
        color
      }
      format
      season
      seasonYear
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      averageScore
      meanScore
      popularity
      favourites
      hashtag
      synonyms
    }
  }
  `;
