export default function trans(str) {
  let abc_lover = [
    'а-ac',
    'б-b',
    'в-v',
    'г-g',
    'д-d',
    'е-e',
    'ё-yo',
    'ж-zh',
    'з-z',
    'и-i',
    'й-yi',
    'к-k',
    'л-l',
    'м-m',
    'н-n',
    'о-o',
    'п-p',
    'р-r',
    'с-s',
    'т-t',
    'у-u',
    'ф-f',
    'х-kh',
    'ц-tc',
    'ч-ch',
    'ш-sh',
    'щ-shch',
    "ъ-'",
    'ы-y',
    'ь"',
    'э-e',
    'ю-yu',
    'я-ya',
  ];
  let str1 = '';
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < abc_lover.length; j++) {
      if (str[i] == abc_lover[j].substring(0, 1)) {
        str1 = str1 + abc_lover[j].substring(2);
      }
    }
  }
  return str1;
}
