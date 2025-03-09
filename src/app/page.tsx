import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {

  const snippets = await prisma.snippet.findMany();

  

  return (
    <div>
      <h1 className="font-bold text-4xl">Home</h1>

      <div className="flex items-center justify-between">
          <h1 className="my-3 text-xl font-semibold">Snippets</h1>
          <Link href={"snippet/new/"}>
            <Button className="cursor-pointer">Add</Button>
          </Link>
      </div>

      <div className="grid grid-cols-1 max-sm:p-4 sm:grid-cols-2 md:grid-cols-3 gap-3 my-3">
        {
          snippets.map((item)=>(
            <div key={item.id} className="bg-gray-200 p-4 flex flex-col gap-2 rounded-xl">
              <h1 className="line-clamp-1"><span className="font-bold ">Title : </span>{item.title}</h1>
              <pre className="bg-gray-900 text-white p-3 rounded-xl h-40 overflow-hidden">
                <code>
                {item.code}
                </code>
              </pre>
              <Link className="mx-auto " href={`/snippet/${item.id}`}><Button className="cursor-pointer hover:scale-95 duration-300 transition-all ">View</Button></Link>
            </div>
          ))
        }
      </div>

    </div>
  );
}
