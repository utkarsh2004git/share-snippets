"use client"

import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import type { Snippet } from '@prisma/client'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'


const EditSippteForm = ({ snippet }: { snippet: Snippet }) => {

    const [code,setCode] = useState(snippet.code);

    const changeEventHandler=(value:string = "")=>{
        setCode(value);
    }


    const saveSnippetAction = saveSnippet.bind(null,snippet.id,code);

    return (
        <div className=''>
            <form action={saveSnippetAction} className='flex justify-between my-3 items-center'>
                <h1 className='text-xl md:text-2xl font-bold'>Edit code : </h1>
                <Button type='submit'>Save</Button>
            </form>
            <Editor
                theme={"vs-dark"}
                className=''
                height={"50vh"}
                defaultLanguage='javascript'
                defaultValue={code}
                onChange={changeEventHandler}
            />
        </div>
    )
}

export default EditSippteForm