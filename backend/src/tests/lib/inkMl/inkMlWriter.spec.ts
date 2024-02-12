import { StrokeData } from '@prisma/client';
import { describe, it } from 'mocha';
import { createInkMLDoc } from '../../../lib/inkMl/inkMlWriter';
import { assert } from 'chai';

describe('createInkMLDoc', () => {
  it('creates document correctly', () => {
    const strokeData: StrokeData[] = [{
      canvasId: 'canvasId1',
      id: 'id1',
      strokePath: {
        points: [{
          x: 3,
          y: 4
        }, {x: 3, y:5}, {x: 100, y: 6}]
      },
      userId: 'user1'
    }, {
      canvasId: 'canvasId1',
      id: 'id2',
      strokePath: {
        points: [{
          x: 2130,
          y: 210
        }, {x: 0, y:123}, {x: 120, y: 93}]
      },
      userId: 'user1'
    }];

    const root = createInkMLDoc(strokeData);
    const xml = root.end();
    const expected = '<?xml version="1.0"?><ink xmlns="http://www.w3.org/2003/InkML"><trace>3 4, 3 5, 100 6</trace><trace>2130 210, 0 123, 120 93</trace></ink>';

    assert.equal(expected, xml);
  });
});