import { Operator } from '../../models';
import { OperatorSerializer } from '../../serializer/OperatorSerializer';

import type * as Express from 'express';

export async function ListOperatorController(req: Express.Request, res: Express.Response) {
  const operators = await Operator.findAll();

  const data = await OperatorSerializer.serialize(
    operators.map((o) => o.toJSON()),
    // Including site relations would be insane load on the server
    {
      relators: [],
    }
  );

  res.send(data);
}
