import { z } from 'zod';

export const PostSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(255),
    content: z.string().min(10, 'Content must be at least 10 characters').max(65535),
    published: z.boolean().default(false),
});

export const PostSchemaPatch = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(255).optional(),
    content: z.string().min(10, 'Content must be at least 10 characters').max(65535).optional(),
    published: z.boolean().default(false).optional(),
});
