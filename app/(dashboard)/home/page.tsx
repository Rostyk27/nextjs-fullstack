import { delay } from '@/lib/async';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import Link from 'next/link';
import Greetings from '@/components/Greetings';
import GreetingsWrapper from '@/components/GreetingsWrapper';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies() as any);
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Home() {
  const { projects } = await getData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsWrapper />}>
            {/* @ts-expect-error Server Component */}
            <Greetings />
          </Suspense>
        </div>

        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map(project => (
            <div className="w-1/3 p-3" key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}

          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>

        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Server Component */}
            <TaskCard title="Today's Tasks" />
          </div>
        </div>
      </div>
    </div>
  );
}
