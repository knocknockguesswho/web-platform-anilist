export enum MEDIA_TYPE {
  ANIME = 'ANIME',
  MANGA = 'MANGA'
}

export enum MEDIA_FORMAT {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  /** Original Video Animation */
  OVA = 'OVA',
  /** Original Net Animation */
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
}

export enum MEDIA_STATUS {
  FINISHED = 'FINISHED',
  RELEASING = 'RELEASING',
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',
  CANCELLED = 'CANCELLED',
  HIATUS = 'HIATUS',
}

export enum MEDIA_SEASON {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
}

export enum MEDIA_SOURCE {
  ORIGINAL = 'ORIGINAL',
  MANGA = 'MANGA',
  LIGHT_NOVEL = 'LIGHT_NOVEL',
  VISUAL_NOVEL = 'VISUAL_NOVEL',
  VIDEO_GAME = 'VIDEO_GAME',
  OTHER = 'OTHER',
  NOVEL = 'NOVEL',
  DOUJINSHI = 'DOUJINSHI',
  ANIME = 'ANIME',
  WEB_NOVEL = 'WEB_NOVEL',
  LIVE_ACTION = 'LIVE_ACTION',
  GAME = 'GAME',
  COMIC = 'COMIC',
  MULTIMEDIA_PROJECT = 'MULTIMEDIA_PROJECT',
  PICTURE_BOOK = 'PICTURE_BOOK',
}

export enum MEDIA_RELATION {
  ADAPTATION = 'ADAPTATION',
  PREQUEL = 'PREQUEL',
  SEQUEL = 'SEQUEL',
  PARENT = 'PARENT',
  SIDE_STORY = 'SIDE_STORY',
  CHARACTER = 'CHARACTER',
  SUMMARY = 'SUMMARY',
  ALTERNATIVE = 'ALTERNATIVE',
  SPIN_OFF = 'SPIN_OFF',
  OTHER = 'OTHER',
  SOURCE = 'SOURCE',
  COMPILATION = 'COMPILATION',
  CONTAINS = 'CONTAINS',
}

export enum MEDIA_CHARACTER_ROLE {
  MAIN = 'MAIN',
  SUPPORTING = 'SUPPORTING',
  BACKGROUND = 'BACKGROUND',
}

export enum MEDIA_EXTERNAL_LINK {
  INFO = 'INFO',
  STREAMING = 'STREAMING',
  SOCIAL = 'SOCIAL',
}

export enum MEDIA_RANK {
  RATED = 'RATED',
  POPULAR = 'POPULAR',
}

export enum MEDIA_LIST_STATUS {
  CURRENT = 'CURRENT',
  PLANNING = 'PLANNING',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  PAUSED = 'PAUSED',
  REPEATING = 'REPEATING',
}

export enum REVIEW_RATING {
  NO_VOTE = 'NO_VOTE',
  UP_VOTE = 'UP_VOTE',
  DOWN_VOTE = 'DOWN_VOTE',
}

export enum RECOMMENDATION_RATING {
  NO_RATING = 'NO_RATING',
  RATE_UP = 'RATE_UP',
  RATE_DOWN = 'RATE_DOWN',
}

export enum MEDIA_SORT_PARAMS {
  ID = 'ID',
  ID_DESC = 'ID_DESC',
  TITLE_ROMAJI = 'TITLE_ROMAJI',
  TITLE_ROMAJI_DESC = 'TITLE_ROMAJI_DESC',
  TITLE_ENGLISH = 'TITLE_ENGLISH',
  TITLE_ENGLISH_DESC = 'TITLE_ENGLISH_DESC',
  TITLE_NATIVE = 'TITLE_NATIVE',
  TITLE_NATIVE_DESC = 'TITLE_NATIVE_DESC',
  TYPE = 'TYPE',
  TYPE_DESC = 'TYPE_DESC',
  FORMAT = 'FORMAT',
  FORMAT_DESC = 'FORMAT_DESC',
  START_DATE = 'START_DATE',
  START_DATE_DESC = 'START_DATE_DESC',
  END_DATE = 'END_DATE',
  END_DATE_DESC = 'END_DATE_DESC',
  SCORE = 'SCORE',
  SCORE_DESC = 'SCORE_DESC',
  POPULARITY = 'POPULARITY',
  POPULARITY_DESC = 'POPULARITY_DESC',
  TRENDING = 'TRENDING',
  TRENDING_DESC = 'TRENDING_DESC',
  EPISODES = 'EPISODES',
  EPISODES_DESC = 'EPISODES_DESC',
  DURATION = 'DURATION',
  DURATION_DESC = 'DURATION_DESC',
  STATUS = 'STATUS',
  STATUS_DESC = 'STATUS_DESC',
  CHAPTERS = 'CHAPTERS',
  CHAPTERS_DESC = 'CHAPTERS_DESC',
  VOLUMES = 'VOLUMES',
  VOLUMES_DESC = 'VOLUMES_DESC',
  UPDATED_AT = 'UPDATED_AT',
  UPDATED_AT_DESC = 'UPDATED_AT_DESC',
  SEARCH_MATCH = 'SEARCH_MATCH',
  FAVOURITES = 'FAVOURITES',
  FAVOURITES_DESC = 'FAVOURITES_DESC',
}

export const typeNameMap: Partial<Record<MEDIA_TYPE, string>> = {
  [MEDIA_TYPE.ANIME]: 'anime',
  [MEDIA_TYPE.MANGA]: 'manga',
};

export const sortNameMap: Partial<Record<MEDIA_SORT_PARAMS, string>> = {
  [MEDIA_SORT_PARAMS.TRENDING_DESC]: 'trending',
  [MEDIA_SORT_PARAMS.POPULARITY_DESC]: 'popular',
  [MEDIA_SORT_PARAMS.SCORE_DESC]: 'best-score',
};

export interface IAnilistMediaTitle {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
}

/** fuzzy date */
export interface IAnilistFuzzyDate {
  year?: number;
  month?: number;
  day?: number;
}

export interface IAnilistMediaTrailer {
  id?: string;
  site?: string;
  thumbnail?: string;
}

export interface IAnilistMediaImage {
  extraLarge?: string;
  large?: string;
  medium?: string;
  /** can used for image placeholder */
  color?: string;
}

export interface IAnilistMediaTag {
  id: number;
  name: string;
  description?: string;
  category?: string;
  rank?: number;
  isGeneralSpoiler?: boolean;
  isMediaSpoiler?: boolean;
  isAdult?: boolean;
  userId?: number;
}

export interface IAnilistPersonName {
  first?: string;
  middle?: string;
  last?: string;
  full?: string;
  native?: string;
  alternative?: Array<string>;
  alternativeSpoiler?: Array<string>;
  userPrefered?: string;
}

export interface IAnilistCharacterImage extends Pick<IAnilistMediaImage, 'large' | 'medium'> {}

export interface IAnilistMediaCharacter {
  id: number;
  name?: IAnilistPersonName;
  image?: IAnilistCharacterImage;
  description?: string;
  gender?: string;
  dateOfBirth?: IAnilistFuzzyDate;
  age?: string;
  bloodType?: string;
  isFavourite?: boolean;
  isFavouriteBlocked?: boolean;
  siteUrl?: string;
  media?: IAnilistMediaConnection;
  favourites?: number;
  modNotes?: string;
}

export interface IAnilistMediaStaffName extends Omit<IAnilistPersonName, 'alternativeSpoiler'> {}

export interface IAnilistStaffImage extends Pick<IAnilistMediaImage, 'large' | 'medium'> {}

export interface IAnilistMediaStaff {
  id: number;
  name?: IAnilistMediaStaffName;
  laguageV2?: string;
  image?: IAnilistStaffImage;
  description?: string;
  primaryOccupations?: Array<string>;
  gender?: string;
  dateOfBirth?: IAnilistFuzzyDate;
  dateOfDeath?: IAnilistFuzzyDate;
  age?: number;
  yearsActive?: Array<number>;
  homeTown?: string;
  bloodType?: string;
  isFavourite?: boolean;
  isFavouriteBlocked?: boolean;
  siteUrl?: string;
  staffMedia?: IAnilistMediaConnection;
  characters?: IAnilistCharacterConnection;
  characterMedia?: IAnilistMediaConnection;
  staff?: IAnilistMediaStaff;
  submitter?: any; // TODO: will using IAnilistMediaUser later;
  submitterStatus?: number;
  submissionNotes?: string;
  favourites?: number;
  modNotes?: string;
}

export interface IAnilistStudio {
  id: number;
  name: string;
  isAnimationStudio?: boolean;
  media?: IAnilistMediaConnection;
  siteUrl?: string;
  isFavourite?: boolean;
  favourites?: number;
}

export interface IAnilistMediaTrend {
  mediaId: number;
  date: number;
  averageScore?: number;
  popularity?: number;
  inProgress?: number;
  releasing?: boolean;
  episode?: number;
  media?: IAnilistMedia;
}

export interface IAnilistReview {
  id: number;
  userId: number;
  mediaId: number;
  mediaType?: MEDIA_TYPE;
  summary?: string;
  body?: string;
  rating?: number;
  ratingAmount?: number;
  userRating?: REVIEW_RATING;
  score?: number;
  private?: boolean;
  siteUrl?: string;
  createdAt: number;
  updatedAt: number;
  user?: any; // TODO: will using IAnilistMediaUser later;
  media?: IAnilistMedia;
}

export interface IAnilistRecommendation {
  id: number;
  rating?: number;
  userRating?: RECOMMENDATION_RATING;
  media?: IAnilistMedia;
  mediaRecommendation?: IAnilistMedia;
  user?: any; // TODO: will using IAnilistMediaUser later;

}

export interface IAnilistMediaEdge {
  node?: IAnilistMedia;
  id?: number;
  relationType?: MEDIA_RELATION;
  isMainStudio: boolean;
  characters?: Array<IAnilistMediaCharacter>;
  characterRole?: MEDIA_CHARACTER_ROLE;
  roleNotes?: string;
  dubGroup?: string;
  staffRole?: string;
  voiceActors?: Array<IAnilistMediaStaff>;
  voiceActorRoles?: Array<IAnilistMediaStaffRoleType>;
  favouriteOrder?: number;
}

export interface IAnilistMediaStaffRoleType {
  voiceActor?: IAnilistMediaStaff;
  roleNotes?: string;
  dubGroup?: string;
}

export interface IAnilistCharacterEdge {
  node?: IAnilistMediaCharacter;
  id?: number;
  role?: MEDIA_CHARACTER_ROLE;
  name?: string;
  voiceActors?: Array<IAnilistMediaStaff>;
  voiceActorRoles?: Array<IAnilistMediaStaffRoleType>;
  media?: Array<IAnilistMedia>;
  favouriteOrder?: number;
}

export interface IAnilistStaffEdge {
  node?: IAnilistMediaStaff;
  id?: number;
  role?: string;
  favouriteOrder?: number;
}

export interface IAnilistStudioEdge {
  node?: Array<IAnilistStudio>;
  id?: number;
  isMain?: boolean;
  favouriteOrder?: number;
}

export interface IAnilistMediaTrendEdge {
  node: IAnilistMediaTrend;
}

export interface IAnilistReviewEdge {
  node: IAnilistReview;
}

export interface IAnilistRecommendationEdge {
  node: IAnilistRecommendation;
}

export interface IAnilistCharacterName extends IAnilistPersonName {}

export interface IAnilistPageInfo {
  total?: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
}

export interface IAnilistMediaConnection {
  edges?: Array<IAnilistMediaEdge>;
  nodes?: Array<IAnilistMedia>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistCharacterConnection {
  edges?: Array<IAnilistCharacterEdge>;
  nodes?: Array<IAnilistMedia>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistStaffConnection {
  edges?: Array<IAnilistStaffEdge>;
  nodes?: Array<IAnilistMediaStaff>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistStudioConnection {
  edges?: Array<IAnilistStudioEdge>;
  nodes?: Array<IAnilistStudio>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistReviewConnection {
  edges?: Array<IAnilistReviewEdge>;
  nodes?: Array<IAnilistReview>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistRecommendationConnection {
  edges?: Array<IAnilistRecommendationEdge>;
  nodes?: Array<IAnilistRecommendation>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistMediaAiringSchedule {
  id: number;
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
  mediaId: number;
  media?: IAnilistMedia;
}

export interface IAnilistMediaTrendConnection {
  edges?: Array<IAnilistMediaTrendEdge>;
  nodes?: Array<IAnilistMediaTrend>;
  pageInfo?: IAnilistPageInfo;
}

export interface IAnilistMediaExternalLink {
  id: number;
  url?: string;
  site: string;
  siteId?: number;
  type?: MEDIA_EXTERNAL_LINK;
  language?: string;
  color?: string;
  icon?: string;
  notes?: string;
  isDisabled?: boolean;
}

export interface IAnilistMediaStreamingEpisode {
  title?: string;
  thumbnail?: string;
  url?: string;
  site?: string;
}

export interface IAnilistMediaRank {
  id: number;
  rank: number;
  type: MEDIA_RANK;
  format: MEDIA_FORMAT;
  year?: number;
  season?: MEDIA_SEASON;
  allTime?: boolean;
  context: string;
}

export interface IAnilistMediaList {
  id: number;
  userId: number;
  mediaId: number;
  status: MEDIA_LIST_STATUS;
  /** float */
  score?: number;
  progress?: number;
  progressVolumes?: number;
  repeat?: number;
  priority?: number;
  private?: boolean;
  notes?: string;
  hiddenFromStatusLists?: boolean;
  /** json */
  customLists?: any;
  /** json */
  advancedScores?: any;
  startedAt?: IAnilistFuzzyDate;
  completedAt?: IAnilistFuzzyDate;
  updatedAt?: number;
  createdAt?: number;
  media?: IAnilistMedia;
  user?: any; // TODO: will using IAnilistMediaUser later;
}

export interface IAnilistScoreDistribution {
  score?: number;
  amount?: number;
}

export interface IAnilistStatusDistribution {
  status?: MEDIA_LIST_STATUS;
  amount?: number;
}

export interface IMediaStats {
  scoreDistribution?: Array<IAnilistScoreDistribution>;
  statusDistribution?: Array<IAnilistStatusDistribution>;
}

export interface IAnilistMedia {
  id: number;
  idMal?: number;
  title?: IAnilistMediaTitle;
  type?: MEDIA_TYPE;
  format?: MEDIA_FORMAT;
  status?: MEDIA_STATUS;
  description?: string;
  startDate?: IAnilistFuzzyDate;
  endDate?: IAnilistFuzzyDate;
  season?: MEDIA_SEASON;
  seasonYear?: number;
  seasonInt?: number;
  episodes?: number;
  duration?: number;
  chapters?: number;
  volumes?: number;
  /** ISO 3166-1 alpha-2 */
  countryOfOrigin?: string;
  isLicensed?: boolean;
  source?: MEDIA_SOURCE;
  hashtag?: string;
  trailer?: IAnilistMediaTrailer;
  updatedAt?: number;
  coverImage?: IAnilistMediaImage;
  bannerImage?: string;
  genres?: Array<string>;
  synonyms?: Array<string>;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  isLocked?: boolean;
  trending?: number;
  favourites?: number;
  tags?: Array<IAnilistMediaTag>;
  relations?: IAnilistMediaConnection;
  characters?: IAnilistCharacterConnection;
  staff?: IAnilistStaffConnection;
  studios?: IAnilistStudioConnection;
  isFavourite?: boolean;
  isFavouriteBlocked?: boolean;
  isAdult?: boolean;
  nextAiringEpisode?: IAnilistMediaAiringSchedule;
  trends?: IAnilistMediaTrendConnection;
  externalLinks?: Array<IAnilistMediaExternalLink>;
  streamingEpisodes?: Array<IAnilistMediaStreamingEpisode>;
  rankings?: Array<IAnilistMediaRank>;
  mediaListEntry?: IAnilistMediaList;
  reviews?: IAnilistReviewConnection;
  recommendations?: IAnilistRecommendationConnection;
  stats?: IMediaStats;
  siteUrl?: string;
  autoCreateForumThread?: boolean;
  isRecommendationBlocked?: boolean;
  isReviewBlocked?: boolean;
  modNotes?: string;
}
