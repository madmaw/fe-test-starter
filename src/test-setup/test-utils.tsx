import { ChakraProvider } from '@chakra-ui/react';
import {
  render,
  type RenderOptions,
} from '@testing-library/react';
import React from 'react';
import {
  type SafeParseError,
  type SafeParseReturnType,
  type SafeParseSuccess,
} from 'zod';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: Provider,
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';

export function expectToBe<T1, T2 extends T1>(t1: T1, t2: T2): asserts t1 is T2 {
  return expect(t1).toBe(t2);
}

export function expectToBeTrue(t: boolean): asserts t is true {
  return expect(t).toBeTruthy();
}

export function expectToBeFalse(t: boolean): asserts t is false {
  return expect(t).toBeFalsy();
}

export function expectSafeParseSuccess<
  Input,
  Output,
>(r: SafeParseReturnType<Input, Output>): asserts r is SafeParseSuccess<Output> {
  if (!r.success) {
    // fail(r.error) unfortunately has been removed
    expect(r.error).toBeUndefined();
  }
}

export function expectSafeParseError<
  Input,
  Output,
>(r: SafeParseReturnType<Input, Output>): asserts r is SafeParseError<Input> {
  expect(r.success).toBeFalsy();
}
