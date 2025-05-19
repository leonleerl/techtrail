import { z } from "zod";

export const CategoryFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
});


export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema>;