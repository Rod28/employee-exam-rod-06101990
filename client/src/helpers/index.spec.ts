import { sleep, createFormatPhone } from './';

describe('Helpers test', () => {
  describe('isValidText()', () => {
    it('Success tests', async () => {
      await sleep(500).then((data) => {
        expect(data).toBe(undefined);
      });
    });

    it('Failed tests - string', async () => {
      await expect(sleep('500' as any)).rejects.toEqual(
        'Error: >> timer is not a number'
      );
    });

    it('Failed tests - undefined', async () => {
      await expect(sleep(undefined as any)).rejects.toEqual(
        'Error: >> timer is not a number'
      );
    });

    it('Failed tests - null', async () => {
      await expect(sleep(null as any)).rejects.toEqual(
        'Error: >> timer is not a number'
      );
    });
  });

  describe('createFormatPhone()', () => {
    it('Success tests', () => {
      expect(createFormatPhone('5536')).toBe('## #### ####');
      expect(createFormatPhone('8136')).toBe('## #### ####');
      expect(createFormatPhone('3306')).toBe('## #### ####');
      expect(createFormatPhone('014458')).toBe('### ### ####');
      expect(createFormatPhone('3032')).toBe('### ### ####');
      expect(createFormatPhone('0056102181')).toBe('### ### ####');
    });

    it('Failed tests', () => {
      expect(createFormatPhone('')).toBe(undefined);
      expect(createFormatPhone('test')).toBe(undefined);
      expect(createFormatPhone('55-39-60-73-25')).toBe(undefined);
      expect(createFormatPhone('55 3960 7325')).toBe(undefined);
      expect(createFormatPhone('+52')).toBe(undefined);
      expect(createFormatPhone('tel: 52')).toBe(undefined);
      expect(createFormatPhone(5510264080 as any)).toBe(undefined);
      expect(createFormatPhone(undefined as any)).toBeFalsy();
      expect(createFormatPhone(null as any)).toBeFalsy();
      expect(createFormatPhone([] as any)).toBeFalsy();
      expect(createFormatPhone({} as any)).toBeFalsy();
    });
  });
});
