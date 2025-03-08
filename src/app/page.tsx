import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {

  const snippets = await prisma.snippet.findMany();

  

  return (
    <div>
      <h1 className="font-bold text-4xl">Home</h1>

      <div className="flex items-center justify-between">
          <h1>Snippets</h1>
          <Link href={"snippet/new/"}>
            <Button className="cursor-pointer">Add</Button>
          </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3">
        {
          snippets.map((item)=>(
            <div key={item.id} className="bg-gray-200 p-4 flex flex-col gap-2 rounded-xl">
              <h1>{item.title}</h1>
              <p>{item.code}</p>
              <Link href={`/snippet/${item.id}`}><Button>View</Button></Link>
            </div>
          ))
        }
      </div>

    </div>
  );
}
