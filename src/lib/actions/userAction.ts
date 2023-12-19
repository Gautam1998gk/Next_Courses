"use server"

import { connectDb } from "@/database"
import { CreateUserParams, UpdateUserParams } from "../../../types"
import { handleError } from "../utils"
import User from "@/database/models/userModel"
import Event from "@/database/models/eventModel"
import { revalidatePath } from "next/cache"
import Order from "@/database/models/orderModel"

export const createUser=async(user:CreateUserParams)=>{
    try {
        await connectDb()
        const newUser =await  User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export const updateUser =async (id:string,user:UpdateUserParams) => {
    try {
        await connectDb()
        const updateuser=await User.findByIdAndUpdate({_id:id},user,{new:true})
        if (!updateuser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updateuser))
    } catch (error) {
        handleError(error)
    }
}

export const deleteUser =async (id:string) => {
    try {
        await connectDb()
        const userToDelete = await User.findOne({ id })

        if (!userToDelete) {
          throw new Error('User not found')
        }
      // Unlink relationships
    await Promise.all([
        // Update the 'events' collection to remove references to the user
        Event.updateMany(
          { _id: { $in: userToDelete.events } },
          { $pull: { organizer: userToDelete._id } }
        ),
  
        // Update the 'orders' collection to remove references to the user
        Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
      ])
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id)
      revalidatePath('/')
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}