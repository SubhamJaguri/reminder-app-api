import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// interface to create object returned my Model.include method
interface includeObject {
  [key: string]: any;
}

export abstract class Model extends BaseEntity {
  // adding index signature so that we can access property
  // by using string key with value type any. "used in Model.exclude method"
  [k: string]: any;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public exclude(...columns: string[]): Model {
    columns.forEach((column: string) => {
      delete this[column];
    });
    return this;
  }

  public include(...columns: string[]): includeObject {
    let tempModel: includeObject = {};

    columns.forEach((column: string) => {
      tempModel[column] = this[column];
    });
    return tempModel;
  }
}
