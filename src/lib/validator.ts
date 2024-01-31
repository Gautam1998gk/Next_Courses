import * as z from "zod"

export const eventFormSchema = z.object({
    title:z.string().min(3,'Title must be 3 characters'),
    description:z.string().min(3,'description must be atleast 3 characters').max(400,"description must be less than 400 char"),
    location:z.string().min(3,'location must be atleast 3 characters').max(400,"description must be less than 400 char"),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    price:z.string(),
    url:z.string().url(),
    isFree:z.boolean(),
    categoryId:z.string()
  })