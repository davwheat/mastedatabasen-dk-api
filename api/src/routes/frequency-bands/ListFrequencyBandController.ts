import { FrequencyBand } from '../../models';
import { FrequencyBandSerializer } from '../../serializer/FrequencyBandSerializer';

import type * as Express from 'express';

export async function ListFrequencyBandControllder(req: Express.Request, res: Express.Response) {
  const model = await FrequencyBand.findAll();

  const data = await FrequencyBandSerializer.serialize(
    model.map((o) => o.toJSON()),
    // Including site relations would be insane load on the server
    {
      relators: [],
    }
  );

  res.send(data);
}
