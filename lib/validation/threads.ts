import * as z from "zod";

export const ThreadValidation = z.object({
    threads: z.string().nonempty().min(3,{message: 'Minimum 3 characters'}),
     accountId : z.string(),
})