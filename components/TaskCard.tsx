import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { Task, TASK_STATUS } from '@prisma/client';

import Button from './Button';
import Card from './Card';

interface TaskCardProps {
  title?: string;
  tasks?: Task[];
}

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  });

  return tasks;
};

const TaskCard = async ({ title, tasks }: TaskCardProps) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>

        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>

      <div>
        {data && data.length ? (
          <div>
            {data.map((task: Task, i: number) => (
              <div className="py-2" key={i}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                  {' - '}
                  <em>
                    <small>
                      <strong
                        className={
                          task.status === TASK_STATUS.COMPLETED
                            ? 'text-green-500'
                            : task.status === TASK_STATUS.STARTED
                            ? 'text-blue-500'
                            : 'text-gray-500'
                        }
                      >
                        {task.status}
                      </strong>
                    </small>
                  </em>
                </div>

                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
