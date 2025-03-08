import { deleteSnippet } from '@/actions';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const SnippetDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {


    const id = parseInt((await params).id);

    
    const snippet = await prisma.snippet.findUnique({
        where: {
            id: id
        }
    });

    if (!snippet) return notFound();
    const deleteSnippetAction =deleteSnippet.bind(null,snippet.id)
    

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
                    <pre className='border rounded-md p-3 text-white flex justify-center'>
                        <code className='bg-gray-950 p-2 rounded-md w-md'>
                            {snippet.code}
                        </code>
                    </pre>
                </div>


            </div>
        </div>
    )
}

export default SnippetDetailPage