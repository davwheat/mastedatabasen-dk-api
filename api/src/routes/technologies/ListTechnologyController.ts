import { Technology } from '../../models';
import { TechnologySerializer } from '../../serializer/TechnologySerializer';

import type * as Express from 'express';

export async function ListTechnologyControllder(req: Express.Request, res: Express.Response) {
  const operators = await Technology.findAll();

  const data = await TechnologySerializer.serialize(
    operators.map((o) => o.toJSON()),
    // Including site relations would be insane load on the server
    {
      relators: [],
    }
  );

  res.send(data);
}
