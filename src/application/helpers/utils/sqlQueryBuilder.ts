export class SQLQueryBuilder {
  private readonly steps: any = [];
  private readonly values: any = [];

  match(condition: any) {
    this.steps.push(`WHERE ${condition}`);
    return this;
  }

  sort(sortObj: any) {
    const orderBy = Object.keys(sortObj)
      .map((key) => `${key} ${sortObj[key] === -1 ? "DESC" : "ASC"}`)
      .join(", ");
    this.steps.push(`ORDER BY ${orderBy}`);
    return this;
  }

  join({ table, on, alias }: any) {
    this.steps.push(`JOIN ${table} AS ${alias} ON ${on}`);
    return this;
  }

  project(fields: any) {
    this.steps.push(`SELECT ${fields}`);
    return this;
  }

  group({ _id, total }: any) {
    this.steps.push(`GROUP BY ${_id}`);
    if (total) {
      this.steps.push(`SELECT ${_id}, SUM(${total}) AS total`);
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
