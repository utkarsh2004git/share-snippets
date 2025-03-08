
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react'

const SnippetDetailPage = async({params}:{params:Promise<{id:string}>}) => {

    const id = parseInt((await params).id);
    const snippet = await prisma.snippet.findUnique({
        where:{
            id:id
        }
    });

    if(!snippet) return notFound();

  return (
    <div>
        <h1>{snippet?.title}</h1>
        <h1>{snippet?.code}</h1>
    </div>
  )
}

export default SnippetDetailPage