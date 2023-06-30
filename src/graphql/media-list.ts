import { gql } from '@apollo/client';
import { IAnilistMedia, IAnilistPageInfo, MEDIA_SORT_PARAMS, MEDIA_TYPE } from 'Helpers/interfaces/anilist-media';

// export interface IDefaultRequestParams {  }

export interface IMediaListQueryParams { page: number; perPage: number, sort?: MEDIA_SORT_PARAMS, type: MEDIA_TYPE, seasonYear?: number }
export interface IMediaListResponse {
  data: { pageInfo: IAnilistPageInfo, media: Array<IAnilistMedia>;}
}

export const getMediaList = gql`
  query ($page: Int, $perPage: Int, $sort: [MediaSort], $type: MediaType, $seasonYear: Int) {
    data: Page(page: $page, perPage: $perPage) {
      pageInfo {
    	  hasNextPage
    	}
      media(sort: $sort, type: $type, isAdult: false, seasonYear: $seasonYear) {
        id
        type
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
`;
