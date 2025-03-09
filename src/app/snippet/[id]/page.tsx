
import { deleteSnippet } from '@/actions';
import CopyToClipboard from '@/components/CopyToClipboard';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const SnippetDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {


    const id = parseInt((await params).id);

    const copyTextToClipboard = (text:string)=>{
        navigator.clipboard.writeText(text);
    }


    const snippet = await prisma.snippet.findUnique({
        where: {
            id: id
        }
    });

    if (!snippet) return notFound();
    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)


    return (
        <div className='flex justify-center w-full'>
            <div className='sm:p-6 rounded-xl w-full sm:w-4xl '>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className='text-xl font-bold '>{snippet?.title}</h1>
                    <div className='flex items-center justify-center gap-6 my-3'>
                        <Link href={`/snippet/${snippet.id}/edit`}><Button variant={"outline"}>Edit</Button></Link>
                        <form action={deleteSnippetAction}>
                            <Button type='submit' variant={"destructive"}>Delete</Button>
                        </form>
                    </div>

                </div>
                <div>
                    <pre className='border rounded-md p-3  text-white flex justify-center'>
                        
                        <code className='bg-gray-900 p-4 rounded-md w-lg'>
                            <div className='h-10 flex justify-end'>
                                <CopyToClipboard text={snippet.code}/>
                            </div>
                            <div>
                                {snippet.code}
                            </div>
                        </code>
                    </pre>
                </div>


            </div>
        </div>
    )
}

export default SnippetDetailPage

export const generateStaticParams=async()=>{
    const snippets = await prisma.snippet.findMany();

    return snippets.map((snippet)=>{
        return {id:snippet.id.toString()}
    })
}