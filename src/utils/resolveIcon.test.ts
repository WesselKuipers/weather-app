import { FaQuestion } from 'react-icons/fa';
import { WiCloud, WiDaySunny, WiFog } from 'react-icons/wi';
import { describe, it, expect } from 'vitest';
import { resolveIcon } from './resolveIcon';

describe('resolveIcon', () => {
  it('should resolve to an icon by its name', () => {
    const icon = resolveIcon('01');
    expect(icon).toStrictEqual(WiDaySunny);
  });

  it('should strip the characters n and d', () => {
    const iconN = resolveIcon('50n');
    const iconD = resolveIcon('03d');

    expect(iconN).toStrictEqual(WiFog);
    expect(iconD).toStrictEqual(WiCloud);
  });

  it('should return a question mark icon for any icon that doesn’t match', () => {
    const empty = resolveIcon('');
    const gibberish = resolveIcon('gibberishhh');

    expect(empty).toStrictEqual(FaQuestion);
    expect(gibberish).toStrictEqual(FaQuestion);
  });
});
