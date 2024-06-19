import {
  render,
  userEvent,
} from './test-setup/test-utils';
export * from '@testing-library/react';

import { type Mock } from 'vitest';
import {
  AMOUNT_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  FormView,
  MAX_AMOUNT_PLACEHOLDER,
  MIN_AMOUNT_PLACEHOLDER,
  NAME_PLACEHOLDER,
  PRICE_TYPE_FIXED_TEXT,
  PRICE_TYPE_RANGE_TEXT,
  SUBMIT_TEXT,
} from './Form';
import {
  type Form,
  PriceType,
} from './schema';

describe('Form', () => {
  let saveData: Mock;
  beforeEach(() => {
    saveData = vi.fn();
  });

  test('Has basic fields', () => {
    const ui = render(
      (
        <FormView
          data={{}}
          saveData={saveData}
        />
      ),
    );

    // Test that the basic inputs and submit button exist
    expect(ui.getByPlaceholderText(NAME_PLACEHOLDER)).toBeInTheDocument();
    expect(ui.getByPlaceholderText(EMAIL_PLACEHOLDER)).toBeInTheDocument();
    expect(ui.getByText(SUBMIT_TEXT)).toBeInTheDocument();
  });

  test('Has fields that are shown conditionally', async () => {
    const ui = render((
      <FormView
        data={{}}
        saveData={saveData}
      />
    ));

    // There are two radio buttons to show the price types
    expect(ui.getAllByRole('radio')).toHaveLength(2);

    // Test that the fixed amount input is shown when the fixed type is selected
    await userEvent.click(ui.getByText(PRICE_TYPE_FIXED_TEXT));
    expect(ui.getByPlaceholderText(AMOUNT_PLACEHOLDER)).toBeInTheDocument();

    /* Test that the fixed amount input is hidden when the fixed type is selected,
     * and the min and max inputs are shown instead */
    await userEvent.click(ui.getByText(PRICE_TYPE_RANGE_TEXT));
    expect(ui.queryByPlaceholderText(AMOUNT_PLACEHOLDER)).not.toBeInTheDocument();
    expect(ui.getByPlaceholderText(MIN_AMOUNT_PLACEHOLDER)).toBeInTheDocument();
    expect(ui.getByPlaceholderText(MAX_AMOUNT_PLACEHOLDER)).toBeInTheDocument();
  });

  // This test hangs, although it appears to call through fine. Suspect there's
  // a bad test configuration somewhere
  test.skip('Calls saveData on success', async () => {
    const data: Form = {
      name: 'Bob',
      email: 'xxx@yyy.zzz',
      price: {
        type: PriceType.fixed,
        amount: 100,
      },
    };
    const ui = render((
      <FormView
        data={data}
        saveData={saveData}
      />
    ));
    expect(saveData).not.toHaveBeenCalled();
    await userEvent.click(ui.getByText(SUBMIT_TEXT));
    expect(saveData).toHaveBeenCalledTimes(1);
    expect(saveData).toHaveBeenCalledWith(data);
  });
});
