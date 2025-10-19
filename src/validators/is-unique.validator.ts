import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { EntityManager } from 'typeorm';

export type IsUniqueConstraintInput = {
  tableName: string;
  column: string;
};

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments) {
    const { tableName, column } = args.constraints[0] as IsUniqueConstraintInput;

    const recordExists = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return !recordExists;
  }

  defaultMessage(args: ValidationArguments) {
    const { tableName, column } = args.constraints[0] as IsUniqueConstraintInput;
    return `El valor para ${column} ya existe en la tabla ${tableName}.`;
  }
}

export function IsUnique(
  options: IsUniqueConstraintInput,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}