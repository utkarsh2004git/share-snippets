"use client"
import { createSnippet } from '@/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import React, { useActionState } from 'react'

const CreateSnippetPage = () => {

    const [formStateData, action] = useActionState(createSnippet, { message: "" })


    return (
        <div className='flex flex-col gap-3'>
            <div>
                <h1 className='font-bold text-2xl sm:text-4xl'>Add new Snippet</h1>
            </div>
            <form className='flex flex-col gap-4' action={action}>
                <div className=''>
                    <Label className='my-3 text-lg ' htmlFor='title'>Title</Label>
                    <Input type='text' name='title' id='title' />

                </div>
                <div>
                    <Label className='my-3 text-lg ' htmlFor='code'>Code</Label>
                    <Textarea className='resize-none' rows={6}  name='code' id='code' />
                    
                </div>
                {formStateData.message && <p className='p-2 text-red-500'>{formStateData.message}</p>}
                <Button type='submit' className='w-full md:w-md mx-auto'>Add</Button>
            </form>
        </div>
    )
}

export default CreateSnippetPage