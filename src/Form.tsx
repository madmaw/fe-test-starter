import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldValues,
  get,
  useForm,
  type UseFormReturn,
} from 'react-hook-form';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  type ComponentType,
  useEffect,
} from 'react';
import {
  type Form,
  formSchema,
  type Price,
  PriceType,
} from './schema';

export const NAME_PLACEHOLDER = 'My Name';
export const EMAIL_PLACEHOLDER = 'me@company.tld';
export const AMOUNT_PLACEHOLDER = 'your amount';
export const MIN_AMOUNT_PLACEHOLDER = 'your minimum';
export const MAX_AMOUNT_PLACEHOLDER = 'your maximum';
export const SUBMIT_TEXT = 'Submit!';
export const PRICE_TYPE_FIXED_TEXT = 'Fixed';
export const PRICE_TYPE_RANGE_TEXT = 'Range';

export type FormProps = {
  readonly data: Form,
  readonly saveData: (data: Form) => void,
};

type FieldProps<TFieldValues extends FieldValues> = {
  methods: UseFormReturn<TFieldValues>,
};

type FieldComponent<
  TFieldValues extends FieldValues,
  Extra = {},
> = ComponentType<FieldProps<TFieldValues> & Extra>;

const FormNameComponent: FieldComponent<{
  readonly name?: string,
}> = function ({
  methods: {
    formState: {
      errors: {
        name: nameError,
      },
    },
    register,
  },
}) {
  return (
    <FormControl isInvalid={!!nameError}>
      <FormLabel>
        Name
      </FormLabel>
      <Input
        type='text'
        autoCapitalize='words'
        placeholder={NAME_PLACEHOLDER}
        {...register('name')}
      />
      <FormErrorMessage>
        {nameError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormEmailComponent: FieldComponent<{
  readonly email?: string,
}> = function ({
  methods: {
    formState: {
      errors: {
        email: emailError,
      },
    },
    register,
  },
}) {
  return (
    <FormControl isInvalid={!!emailError}>
      <FormLabel>
        Email
      </FormLabel>
      <Input
        type='email'
        autoCapitalize='none'
        placeholder={EMAIL_PLACEHOLDER}
        {...register('email')}
      />
      <FormErrorMessage>
        {emailError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormPriceTypeComponent: FieldComponent<{
  readonly price?: {
    readonly type?: PriceType,
  },
}> = function ({
  methods: {
    formState: {
      defaultValues,
      errors,
    },
    register,
  },
}) {
  const priceTypeError = get(errors, 'price.type');
  return (
    <FormControl isInvalid={!!priceTypeError}>
      <FormLabel>
        Price Type
      </FormLabel>
      <RadioGroup defaultValue={defaultValues?.price?.type}>
        <HStack>
          <Radio
            {...register('price.type')}
            value={PriceType.fixed}
          >
            {PRICE_TYPE_FIXED_TEXT}
          </Radio>
          <Radio
            {...register('price.type')}
            value={PriceType.range}
          >
            {PRICE_TYPE_RANGE_TEXT}
          </Radio>
        </HStack>
      </RadioGroup>
      <FormErrorMessage>
        {priceTypeError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormFixedPriceComponent: FieldComponent<{
  readonly price?: {
    readonly amount?: number,
  },
}> = function ({
  methods: {
    formState: {
      errors,
    },
    register,
  },
}) {
  const priceAmountError = get(errors, 'price.amount');
  return (
    <FormControl isInvalid={!!priceAmountError}>
      <FormLabel>
        Amount
      </FormLabel>
      <HStack>
        <Text>
          $
        </Text>
        <Input
          type='number'
          placeholder={AMOUNT_PLACEHOLDER}
          {...register('price.amount', {
            valueAsNumber: true,
          })}
        />
      </HStack>
      <FormErrorMessage>
        {priceAmountError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormRangedMinPriceComponent: FieldComponent<{
  readonly price?: {
    readonly amount?: {
      readonly min?: number,
    },
  },
}> = function ({
  methods: {
    formState: {
      errors,
    },
    register,
  },
}) {
  // also catch validation errors on amount here because the max > min validation has nowhere
  // to be displayed otherwise
  const priceAmountMinError = get(errors, 'price.amount.min') || get(errors, 'price.amount');
  return (
    <FormControl isInvalid={!!priceAmountMinError}>
      <VStack align='stretch'>
        <FormLabel>
          Min
        </FormLabel>
        <HStack marginTop={0}>
          <Text>
            $
          </Text>
          <Input
            type='number'
            placeholder={MIN_AMOUNT_PLACEHOLDER}
            {...register('price.amount.min', {
              valueAsNumber: true,
            })}
          />
        </HStack>
      </VStack>
      <FormErrorMessage>
        {priceAmountMinError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormRangedMaxPriceComponent: FieldComponent<{
  readonly price?: {
    readonly amount?: {
      readonly max?: number,
    },
  },
}> = function ({
  methods: {
    formState: {
      errors,
    },
    register,
  },
}) {
  const priceAmountMaxError = get(errors, 'price.amount.max');
  return (
    <FormControl isInvalid={!!priceAmountMaxError}>
      <VStack align='stretch'>
        <FormLabel>
          Min
        </FormLabel>
        <HStack>
          <Text>
            $
          </Text>
          <Input
            type='number'
            placeholder={MAX_AMOUNT_PLACEHOLDER}
            {...register('price.amount.max', {
              valueAsNumber: true,
            })}
          />
        </HStack>
      </VStack>
      <FormErrorMessage>
        {priceAmountMaxError?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FormPriceComponent: FieldComponent<{
  readonly price?: Price,
}> = function ({
  methods,
}) {
  const price = methods.watch().price;
  if (price == null) {
    return null;
  }
  switch (price.type) {
    case PriceType.fixed:
      // it should be of the correct type, but the above check does not narrow the type
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
      return <FormFixedPriceComponent methods={methods as any} />;
    case PriceType.range:
      return (
        <HStack align='start'>
          {
            /*
              it should be of the correct type, but the above check does not narrow the type
            */
          }
          {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any */}
          <FormRangedMinPriceComponent methods={methods as any} />
          {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any */}
          <FormRangedMaxPriceComponent methods={methods as any} />
        </HStack>
      );

    case undefined:
      return null;
    case null:
      return null;
    default:
      price satisfies never;
      throw new Error(price);
  }
};

export const FormView = ({
  data,
  saveData,
}: FormProps) => {
  const methods = useForm<Form>({
    resolver: zodResolver(formSchema),
    values: data,
  });
  const {
    handleSubmit,
    watch,
    clearErrors,
  } = methods;

  const watched = watch();
  useEffect(function () {
    clearErrors('price');
  }, [
    watched.price?.type,
    clearErrors,
  ]);

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <VStack align='stretch'>
        <FormNameComponent methods={methods} />
        <FormEmailComponent methods={methods} />
        <FormPriceTypeComponent methods={methods} />
        <FormPriceComponent methods={methods} />
        <Button type='submit'>
          {SUBMIT_TEXT}
        </Button>
      </VStack>
    </form>
  );
};
