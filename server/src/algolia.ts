import * as rp from "request-promise";

import { _getUnixTimestamp } from "./helpers";

export const HITS_PER_PAGE = 50;

export class AlgoliaApi {
  static async getDay() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24;

    var options = {
      uri: `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=${HITS_PER_PAGE}&numericFilters=created_at_i>${timestamp}`,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }

  static async getWeek() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24 * 7;

    var options = {
      uri: `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=${HITS_PER_PAGE}&numericFilters=created_at_i>${timestamp}`,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }

  static async getMonth() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24 * 30;

    var options = {
      uri: `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=${HITS_PER_PAGE}&numericFilters=created_at_i>${timestamp}`,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }
}
