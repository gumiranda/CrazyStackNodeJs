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

  join({ table, on }: any) {
    this.steps.push(`JOIN "${table}" ON ${on}`);
    return this;
  }

  project(fields: any) {
    this.steps.push(`SELECT ${fields} FROM "${this.tableName}"`);
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

  build() {
    const query = this.steps.join(" ");
    return { text: query, values: this.values };
  }
}
