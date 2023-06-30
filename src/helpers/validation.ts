export enum GENERAL_ERROR_CODE {
  FILE_TOO_BIG = 'fileTooBig',
  INVALID_FILE_FORMAT = 'invalidFileFormat',
  EMPTY_COLLECTION_NAME = 'emptyCollectionName'
}
export function imageFileValidationHelper(file: File, maxSize?: number) {
  const extension = file.name.split('.').pop() || '';
  const type = file.type.split('/');
  const validImageType = ['jpeg', 'jpg', 'png', 'gif'];
  const isImageTypeValid =
    validImageType.includes(extension.toLowerCase()) && validImageType.includes(type[1]) && type[0] === 'image';
  if (Boolean(maxSize) && file.size > (maxSize as number)) {
    return {
      status: false,
      code: GENERAL_ERROR_CODE.FILE_TOO_BIG,
    };
  }
  if (!isImageTypeValid || file.size <= 0) {
    return {
      status: false,
      code: GENERAL_ERROR_CODE.INVALID_FILE_FORMAT,
    };
  }

  return { status: true };
}

export function forceHttp(itemImageURL: string, value: string) {
  if (itemImageURL && itemImageURL.slice(0, 4) === 'http') {
    return itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 4) === 'blob') {
    return itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 2) === '//') {
    return 'http:' + itemImageURL;
  }
  if (itemImageURL && itemImageURL.slice(0, 1) === '/') {
    return itemImageURL;
  }
  return value;
}

export const inputPattern = Object.freeze({
  collectionName: '^[a-zA-Z0-9\\s]+$',
});

export function validateCollectionName(input: string) {
  const regex = new RegExp(inputPattern.collectionName);
  return regex.test(input);
}
