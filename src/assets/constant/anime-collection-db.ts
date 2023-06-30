import Dexie, { IndexableType } from 'dexie';
import { config } from 'Config/config';
import { IAnilistMedia } from 'Helpers/interfaces/anilist-media';

export interface IAnimeCollectionDataItem {
  id: IAnilistMedia['id'];
  title: IAnilistMedia['title'];
  type: IAnilistMedia['type'];
  coverImage?: IAnilistMedia['coverImage'];
}

export interface IAnimeCollectionData {
  id?: number;
  name: string;
  items?: Array<IAnimeCollectionDataItem>;
}

export type TCollectionName = Pick<IAnimeCollectionData, 'id' | 'name'> & { firstItem: IAnimeCollectionDataItem };

export const tableName = 'anime_collection';
const dexie = new Dexie(config.indexedDbName);
dexie.version(1).stores({ [tableName]: '++id, &name, items' });

export const fetchAllData = async () => {
  await dexie.open();
  const result: Array<IAnimeCollectionData> = await dexie.table(tableName).toArray();
  dexie.close();
  return result;
};

export const fetchDataById = async (id: IndexableType) => {
  await dexie.open();
  const result: IAnimeCollectionData = await dexie.table(tableName).get(id);
  dexie.close();
  return result;
};

export const fetchCollectionName = async () => {
  await dexie.open();
  const result: Array<IAnimeCollectionData> = (await dexie.table(tableName).toArray()).map((item) => ({ id: item.id, name: item.name, items: item.items && item.items.length > 0 ? [item.items[0]] : [] }));
  dexie.close;
  return result;
};
export const fetchCollectionNameById = async (id: IndexableType) => {
  await dexie.open();
  const data = await dexie.table(tableName).get(id);
  const result: IAnimeCollectionData = { id: data.id, name: data.name, items: data.items.length > 0 ? [data.items[0]] : [] };
  dexie.close;
  return result;
};

/** get data with first item on `items` */
export const bulkFetchCollectionNameById = async (ids: Array<IndexableType>) => {
  await dexie.open();
  const datas = await dexie.table(tableName).bulkGet(ids);
  const result: Array<IAnimeCollectionData> = datas.map((data) => ({ id: data.id, name: data.name, items: data.items.length > 0 ? [data.items[0]] : [] }));
  dexie.close;
  return result;
};

export const addNewCollectionWithData = async (data: IAnimeCollectionData) => {
  await dexie.open();
  await dexie.table(tableName).add(data);
  dexie.close();
};

export const appendCollectionItem = async (data: IAnimeCollectionData) => {
  await dexie.open();
  const record = await dexie.table(tableName).get(data.id as number);
  await dexie.table(tableName).put({ id: data.id, name: data.name, items: record.items ? record.items.concat(data.items as Array<IAnimeCollectionDataItem>) : data.items as Array<IAnimeCollectionDataItem> });
  dexie.close();
};

export const removeCollectionItem = async (collectionId: IndexableType, itemsId: IndexableType) => {
  await dexie.open();
  await dexie.table(tableName).get(collectionId as number, (data: IAnimeCollectionData) => {
    const updatedItems = data.items?.filter((item) => item.id !== itemsId);
    data.items = updatedItems;
    dexie.table(tableName).put(data);
  });
  dexie.close();
};

export const removeCollection = async (id: IAnimeCollectionData['id']) => {
  await dexie.open();
  await dexie.table(tableName).delete(id as number);
  dexie.close();
};

export const updateCollection = async (data: IAnimeCollectionData) => {
  await dexie.open();
  await dexie.table(tableName).put(data);
  dexie.close();
};

export default dexie;
