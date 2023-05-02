import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';

import TaskCard from '@/components/TaskCard';

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies() as any);
  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      {/* @ts-expect-error Server Component */}
      <TaskCard tasks={project.tasks} title={project.name} />
    </div>
  );
}
