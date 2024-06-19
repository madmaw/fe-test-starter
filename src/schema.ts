import * as z from 'zod';

const priceTypeSchema = z.enum([
  'fixed',
  'range',
]);
export const PriceType = priceTypeSchema.enum;
export type PriceType = z.infer<typeof priceTypeSchema>;

const mutableFixedPriceSchema = z.object({
  type: z.literal(PriceType.fixed),
  amount: z.number(),
});
const fixedPriceSchema = mutableFixedPriceSchema.readonly();

export type FixedPrice = z.infer<typeof fixedPriceSchema>;
export type MutableFixedPrice = z.infer<typeof mutableFixedPriceSchema>;

const mutableRangePriceSchema = z.object({
  type: z.literal(PriceType.range),
  amount: z.object({
    min: z.number(),
    max: z.number(),
  }).refine(function ({
    min,
    max,
  }) {
    return max == null || min == null || max >= min;
  }, 'Min must be less than max'),
});
const rangePriceSchema = mutableRangePriceSchema.readonly();
export type RangePrice = z.infer<typeof rangePriceSchema>;
export type MutableRangePrice = z.infer<typeof mutableRangePriceSchema>;

const mutablePriceSchema = z.discriminatedUnion('type', [
  mutableFixedPriceSchema,
  mutableRangePriceSchema,
]);
const priceSchema = mutablePriceSchema.readonly();

export type Price = z.infer<typeof priceSchema>;
export type MutablePrice = z.infer<typeof mutablePriceSchema>;

// Create zod validation schema for the form
const mutableFormSchema = z.object({
  name: z.string().min(1).max(10),
  email: z.string().email(),
  price: z.optional(mutablePriceSchema),
});
export const formSchema = mutableFormSchema.readonly();

export type Form = z.infer<typeof formSchema>;
export type MutableForm = z.infer<typeof mutableFormSchema>;
