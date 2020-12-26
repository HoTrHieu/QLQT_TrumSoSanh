export class StringUtil {
  private static readonly SEPARATOR = /[!@#$%^&*()+={}:;"',.<>/\?~`|]+|\[+|\]+|\s+/;
  static countWords(text: string) {
    return this.splitWords(text).length;
  }

  static splitWords(text: string) {
    return text
      .trim()
      .replace(/s+/g, ' ')
      .split(this.SEPARATOR)
      .filter((w) => !!w);
  }

  static makePhrases(words: string[], len: number) {
    let tmp = [];
    let phrases = [];
    for (const word of words) {
      tmp.push(word);
      if (tmp.length === len) {
        phrases.push(tmp.join(' '));
        tmp.length = 0;
      }
    }
    if (tmp.length > 0) {
      if (phrases.length > 0) {
        phrases[phrases.length - 1] += ' ' + tmp.join(' ');
      } else {
        phrases.push(tmp.join(' '));
      }
    }
    return phrases;
  }
}
