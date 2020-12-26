export class RequestUtil {
  static parseArray(value: any) {
    return !!value && !Array.isArray(value) ? [value] : value;
  }
}
