"use server"

import { connectToDatabase } from "@/database"
import { CreateCategoryParams } from "../../../types"
import { handleError } from "../utils"
import Category from "@/database/models/categoryModel"

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDatabase()
        const newcategory = await Category.create({ name: categoryName })
        return JSON.parse(JSON.stringify(newcategory))
    } catch (error) {
        handleError(error)
    }
}
export const getAllCategories = async () => {
    try {
        await connectToDatabase()
        const getCategories = await Category.find()
        return JSON.parse(JSON.stringify(getCategories))
    } catch (error) {
        handleError(error)
    }
}