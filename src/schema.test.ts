import { formSchema } from './schema';
import {
  expectSafeParseError,
  expectSafeParseSuccess,
} from './test-setup/test-utils';

describe('Basic validation schema', () => {
  test('passes with valid data', () => {
    const data = {
      name: 'John',
      email: 'test@test.com',
    };
    const result = formSchema.safeParse(data);

    expectSafeParseSuccess(result);
    expect(result.data).to.not.be.empty;
    expect(result.data).toEqual(data);
  });

  test('fails with missing data', () => {
    const result = formSchema.safeParse({
      name: '',
      email: '',
    });

    expectSafeParseError(result);
    expect(result.error.issues[0]?.message).toBe(
      'String must contain at least 1 character(s)',
    );

    expect(result.success).toEqual(false);
  });

  test('fails when name is more than 10 characters', () => {
    const result = formSchema.safeParse({
      name: 'this name is longer than 10 characters',
      email: 'test@test.com',
    });

    expectSafeParseError(result);
    expect(result.error.issues[0]?.message).toBe(
      'String must contain at most 10 character(s)',
    );
  });

  test('fails when email is in an invalid format ', () => {
    const result = formSchema.safeParse({
      name: 'John',
      email: 'test,test@com',
    });

    expectSafeParseError(result);
    expect(result.error.issues[0]?.message).toBe('Invalid email');
  });
});

describe('Conditional validation schema', () => {
  describe('when price type is "fixed"', () => {
    test('passes with a valid number amount', () => {
      const data = {
        name: 'John',
        email: 'test@test.com',
        price: {
          type: 'fixed',
          amount: 100,
        },
      };

      const result = formSchema.safeParse(data);

      expectSafeParseSuccess(result);
      expect(result.data).to.not.be.empty;
      expect(result.data).toEqual(data);
    });

    test('fails with an non-number amount', () => {
      const result = formSchema.safeParse({
        name: 'John',
        email: 'test@test.com',
        price: {
          type: 'fixed',
          amount: 'string',
        },
      });

      expectSafeParseError(result);
      expect(result.error.issues[0]?.message).toBe(
        'Expected number, received string',
      );
    });
  });

  describe('when price type is "range"', () => {
    test('passes when min and max have valid number values', () => {
      const data = {
        name: 'John',
        email: 'test@test.com',
        price: {
          type: 'range',
          amount: {
            min: 1,
            max: 10,
          },
        },
      };

      const result = formSchema.safeParse(data);

      expectSafeParseSuccess(result);
      expect(result.data).to.not.be.empty;
      expect(result.data).toEqual(data);
    });

    test('fails when min is greater than max', () => {
      const result = formSchema.safeParse({
        name: 'John',
        email: 'test@test.com',
        price: {
          type: 'range',
          amount: {
            min: 10,
            max: 1,
          },
        },
      });

      expectSafeParseError(result);
      expect(result.error.issues[0]?.message).toBe(
        'Min must be less than max',
      );
    });
  });
});
