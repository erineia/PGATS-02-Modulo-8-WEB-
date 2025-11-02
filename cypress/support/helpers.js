import { faker } from '@faker-js/faker';

export function getRandomNumber() {
  return faker.number.bigInt();
}

export function getRandomEmail() {
  return `qa-tester-${getRandomNumber()}@test.com`;
}
