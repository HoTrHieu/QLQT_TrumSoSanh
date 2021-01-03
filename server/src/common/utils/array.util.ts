export class ArrayUtil {
  static flatMap(arr: any) {
    return arr.reduce((x, y) => x.concat(y), []);
  }
  static toSet(arr: any) {
    return arr.reduce((obj, curr) => {
      obj[curr] = true;
      return obj;
    }, {});
  }
}
