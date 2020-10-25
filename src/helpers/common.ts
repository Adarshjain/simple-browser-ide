export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function sortFn<T>(itemA: T, itemB: T): number {
  if (itemA === itemB) {
    return 0;
  }
  return itemA < itemB ? -1 : 1;
}