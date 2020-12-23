export class ArrayUtil {
  static flatMap(arr: any) {
    return arr.reduce((x, y) => x.concat(y), []);
  }
}