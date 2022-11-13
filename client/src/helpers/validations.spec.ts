import {
  isValidText,
  isValidMail,
  isValidPhone,
  isValidOnlyNumbers,
  isValidMaxLength
} from './validations';

describe('Validations test', () => {
  describe('isValidText()', () => {
    it('Success tests', () => {
      expect(isValidText('Rod')).toBeTruthy();
      expect(isValidText('rod')).toBeTruthy();
      expect(isValidText('RoD G')).toBeTruthy();
      expect(isValidText('R G S')).toBeTruthy();
      expect(isValidText('')).toBeTruthy();
    });

    it('Failed tests', () => {
      expect(isValidText('Rod ')).toBeFalsy();
      expect(isValidText(' Rod')).toBeFalsy();
      expect(isValidText('Rod G ')).toBeFalsy();
      expect(isValidText('Rod G.')).toBeFalsy();
      expect(isValidText(' ')).toBeFalsy();
      expect(isValidText('#26')).toBeFalsy();
      expect(isValidText('5539607325')).toBeFalsy();
      expect(isValidText(undefined as any)).toBeFalsy();
      expect(isValidText(null as any)).toBeFalsy();
      expect(isValidText(4 as any)).toBeFalsy();
      expect(isValidText([] as any)).toBeFalsy();
      expect(isValidText(['test'] as any)).toBeFalsy();
      expect(isValidText({} as any)).toBeFalsy();
      expect(isValidText({ test: 10 } as any)).toBeFalsy();
    });
  });

  describe('isValidMail()', () => {
    it('Success tests', () => {
      expect(isValidMail('r.garez29@gmail.com')).toBeTruthy();
      expect(isValidMail('_gam0629@miempresa.com.mx')).toBeTruthy();
      expect(isValidMail('micorreo#23cor@micorreo')).toBeTruthy();
      expect(isValidMail('micorreo@micorreo.co')).toBeTruthy();
      expect(isValidMail('')).toBeTruthy();
    });

    it('Failed tests', () => {
      expect(isValidMail('micorreo')).toBeFalsy();
      expect(isValidMail('micorreo@micorreo.')).toBeFalsy();
      expect(isValidMail('micorreo@micorreo.com.')).toBeFalsy();
      expect(isValidMail('micorreo@micorreo.com.f')).toBeFalsy();
      expect(isValidMail('@')).toBeFalsy();
      expect(isValidMail(' ')).toBeFalsy();
      expect(isValidMail(undefined as any)).toBeFalsy();
      expect(isValidMail(null as any)).toBeFalsy();
      expect(isValidMail(4 as any)).toBeFalsy();
      expect(isValidMail([] as any)).toBeFalsy();
      expect(isValidMail(['test'] as any)).toBeFalsy();
      expect(isValidMail({} as any)).toBeFalsy();
      expect(isValidMail({ test: 10 } as any)).toBeFalsy();
    });
  });

  describe('isValidPhone()', () => {
    it('Success tests', () => {
      expect(isValidPhone('5539607325')).toBeTruthy();
      expect(isValidPhone('0152902800')).toBeTruthy();
    });

    it('Failed tests', () => {
      expect(isValidPhone('55396073251505100051')).toBeFalsy();
      expect(isValidPhone('553960732')).toBeFalsy();
      expect(isValidPhone('5')).toBeFalsy();
      expect(isValidPhone('Rod ')).toBeFalsy();
      expect(isValidPhone(' Rod')).toBeFalsy();
      expect(isValidPhone(0 as any)).toBeFalsy();
      expect(isValidPhone(4 as any)).toBeFalsy();
      expect(isValidPhone([] as any)).toBeFalsy();
      expect(isValidPhone(['test'] as any)).toBeFalsy();
      expect(isValidPhone({} as any)).toBeFalsy();
      expect(isValidPhone({ test: 10 } as any)).toBeFalsy();
      expect(isValidPhone(undefined as any)).toBeFalsy();
      expect(isValidPhone(null as any)).toBeFalsy();
    });
  });

  describe('isValidOnlyNumbers()', () => {
    it('Success tests', () => {
      expect(isValidOnlyNumbers('5539607325')).toBeTruthy();
      expect(isValidOnlyNumbers('10')).toBeTruthy();
      expect(isValidOnlyNumbers('0')).toBeTruthy();
      expect(isValidOnlyNumbers('')).toBeTruthy();
    });

    it('Failed tests', () => {
      expect(isValidOnlyNumbers('5-105')).toBeFalsy();
      expect(isValidOnlyNumbers('25.56')).toBeFalsy();
      expect(isValidOnlyNumbers('$5')).toBeFalsy();
      expect(isValidOnlyNumbers('test')).toBeFalsy();
      expect(isValidOnlyNumbers('#')).toBeFalsy();
      expect(isValidOnlyNumbers(4 as any)).toBeFalsy();
      expect(isValidOnlyNumbers([] as any)).toBeFalsy();
      expect(isValidOnlyNumbers(['test'] as any)).toBeFalsy();
      expect(isValidOnlyNumbers({} as any)).toBeFalsy();
      expect(isValidOnlyNumbers({ test: 10 } as any)).toBeFalsy();
      expect(isValidOnlyNumbers(undefined as any)).toBeFalsy();
      expect(isValidOnlyNumbers(null as any)).toBeFalsy();
    });
  });

  describe('isValidMaxLength()', () => {
    it('Success tests', () => {
      expect(isValidMaxLength('Rod', 7)).toBeTruthy();
      expect(isValidMaxLength('Rod', 3)).toBeTruthy();
      expect(isValidMaxLength('0152902800', 10)).toBeTruthy();
      expect(isValidMaxLength('', 4)).toBeTruthy();
    });

    it('Failed tests', () => {
      expect(isValidMaxLength('Rod', 0)).toBeFalsy();
      expect(isValidMaxLength('Rodrigo', 3)).toBeFalsy();
      expect(isValidMaxLength('Rod', '3' as any)).toBeFalsy();
      expect(isValidMaxLength('Rod', undefined as any)).toBeFalsy();
      expect(isValidMaxLength('Rod', null as any)).toBeFalsy();
      expect(isValidMaxLength(0 as any, 0)).toBeFalsy();
      expect(isValidMaxLength(4 as any, 0)).toBeFalsy();
      expect(isValidMaxLength([] as any, 0)).toBeFalsy();
      expect(isValidMaxLength(['test'] as any, 0)).toBeFalsy();
      expect(isValidMaxLength({} as any, 0)).toBeFalsy();
      expect(isValidMaxLength({ test: 10 } as any, 0)).toBeFalsy();
      expect(isValidMaxLength(undefined as any, 0)).toBeFalsy();
      expect(isValidMaxLength(null as any, 0)).toBeFalsy();
    });
  });
});
