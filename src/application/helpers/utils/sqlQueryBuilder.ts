export class SQLQueryBuilder {
  steps: any = [];
  values: any = [];
  tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  match(condition: any) {
    this.steps.push(`WHERE ${condition}`);
    return this;
  }

  sort(sortObj: any) {
    const orderBy = Object.keys(sortObj)
      .map((key) => `"${key}" ${sortObj[key] === -1 ? "DESC" : "ASC"}`)
      .join(", ");
    this.steps.push(`ORDER BY ${orderBy}`);
    return this;
  }
  sortByDistance(lng: number, lat: number) {
    this.steps.push(`ORDER BY
    ST_DistanceSphere(
        ST_SetSRID(
            ST_MakePoint(
                (users.coord->'coordinates'->>0)::float,
                (users.coord->'coordinates'->>1)::float
            ), 4326
        ),
        ST_SetSRID(ST_MakePoint($4, $5), 4326)
    ) ASC`);
    this.addValue(lng);
    this.addValue(lat);
    return this;
  }

  join({ table, on }: any) {
    this.steps.push(`JOIN "${table}" ON ${on}`);
    return this;
  }

  project(fields: any) {
    this.steps.push(`SELECT ${fields} FROM "${this.tableName}"`);
    return this;
  }

  projectWithDistance(lng: number, lat: number) {
    this.steps.push(
      `SELECT ${this.tableName}.*, ST_DistanceSphere( ST_SetSRID( ST_MakePoint( (${this.tableName}.coord->'coordinates'->>0)::float, (${this.tableName}.coord->'coordinates'->>1)::float ), 4326 ), ST_SetSRID(ST_MakePoint($1, $2), 4326) ) AS distance FROM "${this.tableName}" `
    );
    this.addValue(lng);
    this.addValue(lat);
    return this;
  }

  projectSubQuery(fields: any, from: any, as: any) {
    this.steps.push(`SELECT ${fields} FROM (${from}) as ${as}`);
    return this;
  }

  group({ _id, total }: any) {
    this.steps.push(`GROUP BY ${_id}`);
    if (total) {
      this.steps.push(`HAVING COUNT(*) > ${total}`);
    }
    return this;
  }

  addValue(value: string | number | boolean) {
    this.values.push(value);
    return this;
  }
  skip(count: number) {
    this.steps.push(`OFFSET ${count}`);
    return this;
  }
  limit(count: number) {
    this.steps.push(`LIMIT ${count}`);
    return this;
  }
  build() {
    const query = this.steps.join(" ");
    return { text: query, values: this.values };
  }
}
