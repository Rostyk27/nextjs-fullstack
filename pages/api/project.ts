import { NextApiRequest, NextApiResponse } from 'next';
import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const index = process.env.COOKIE_NAME as string;
  const user = await validateJWT(req.cookies[index] as string);

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: 'ok' } });
}
