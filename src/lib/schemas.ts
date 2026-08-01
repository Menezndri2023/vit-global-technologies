import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  locale: z.string().default("fr")
});

export const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service: z.string().min(1),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10),
  locale: z.string().default("fr")
});

export const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  topic: z.string().min(1),
  expert: z.string().optional(),
  mode: z.string().optional(),
  date: z.string().min(1),
  timeSlot: z.string().min(1),
  notes: z.string().optional(),
  locale: z.string().default("fr")
});

export const jobApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().min(1),
  portfolioUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  message: z.string().optional(),
  locale: z.string().default("fr")
});

export const partnerRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  country: z.string().optional(),
  partnerType: z.string().min(1),
  message: z.string().min(10),
  locale: z.string().default("fr")
});

export const chatLeadSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  message: z.string().min(1),
  page: z.string().optional(),
  locale: z.string().default("fr")
});

export const customPricingLineSchema = z.object({
  title: z.string().min(1).max(120),
  amount: z.string().min(1).max(80)
});

export const customPricingSchema = z.array(customPricingLineSchema).max(30);

export type CustomPricingLine = z.infer<typeof customPricingLineSchema>;

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type PartnerRequestInput = z.infer<typeof partnerRequestSchema>;
export type ChatLeadInput = z.infer<typeof chatLeadSchema>;
