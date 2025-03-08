"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"



export async function createSnippet(prevState: { message: string }, formData: FormData) {

    const title = formData.get("title");
    const code = formData.get("code");

    try {
        if (typeof title !== "string" || title.length < 4) {
            return { message: "Title is required & atleast 4 character long" }
        }
        if (typeof code !== "string" || code.length < 8) {
            return { message: "Code is required & atleast 8 character long" }
        }

        const snippet = await prisma.snippet.create({
            data: {
                title,
                code
            }
        });
        console.log("Snippet createdd : ", snippet);
    } catch (error:unknown) {
        if(error instanceof Error)
            return {message:error.message}
        else{
            return {message:"Internal server error | 500"}
        }
    }

    redirect("/");
}

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
        where: {
            id: id,
        },
        data: {
            code
        }
    })
    redirect(`/snippet/${id}`)
}

export const deleteSnippet = async (id: number) => {

    await prisma.snippet.delete({
        where: {
            id: id
        }
    })
    redirect(`/`)
}