
import EditSippteForm from '@/components/EditSippetForm'
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

import { notFound } from 'next/navigation';
import React from 'react'

const EditSnippetPage = async({params}:{params:Promise<{id:string}>}) => {
  const id = parseInt((await params).id);

  const snippet =  await prisma.snippet.findUnique({
    where:{
      id:id,
    }
  });

  if(!snippet) return notFound();

  return (
    <div>
      <EditSippteForm snippet = {snippet}/>
    </div>
  )
}

export default EditSnippetPage