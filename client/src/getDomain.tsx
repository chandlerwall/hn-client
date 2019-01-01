export function getDomain(url: string | undefined) {
  if (url === undefined) {
    return "";
  }
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];
  return domain;
}
