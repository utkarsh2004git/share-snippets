import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateSnippetPage = () => {

    async function createSnippet(formData:FormData){
        "use server"
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        const snippet = await  prisma.snippet.create({
            data:{
                title,
                code
            }
        });
        console.log("Snippet createdd : ",snippet);
        
        redirect("/");
    }
    


    return (
        <div className='flex flex-col gap-3'>
            <div>
                <h1 className='font-bold text-4xl'>Add new Snippet</h1>
            </div>
            <form className='flex flex-col gap-4' action={createSnippet}>
                <div className=''>
                    <Label className='my-3 text-lg '  htmlFor='title'>Title</Label>
                    <Input type='text' name='title' id='title' />
                </div>
                <div>
                    <Label className='my-3 text-lg ' htmlFor='code'>Code</Label>
                    <Textarea  className='' rows={10} name='code' id='code' />

                </div>
                <Button type='submit'>Add</Button>
            </form>
        </div>
    )
}

export default CreateSnippetPage