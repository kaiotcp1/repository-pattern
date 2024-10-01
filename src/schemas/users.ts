import { z } from 'zod';

export const UserSchema = z.object({
    email: z.string().email('Invalid email').min(8, 'Email must be at least 8 characters').max(255),
    name: z.string().min(4, 'Name must be at least 4 characters').max(60),
    password: z.string().min(8, 'Password must be at least 8 characters').max(255),
});

export const UserSchemaPatch = z.object({
    email: z.string().email('Invalid email').min(8, 'Email must be at least 8 characters').max(255).optional(),
    name: z.string().min(4, 'Name must be at least 4 characters').max(60).optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').max(255).optional(),
});