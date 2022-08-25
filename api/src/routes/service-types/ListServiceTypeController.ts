import { ServiceType } from '../../models';
import { ServiceTypeSerializer } from '../../serializer/ServiceTypeSerializer';

import type * as Express from 'express';

export async function ListServiceTypeControllder(req: Express.Request, res: Express.Response) {
  const model = await ServiceType.findAll();

  const data = await ServiceTypeSerializer.serialize(
    model.map((o) => o.toJSON()),
    // Including site relations would be insane load on the server
    {
      relators: [],
    }
  );

  res.send(data);
}
