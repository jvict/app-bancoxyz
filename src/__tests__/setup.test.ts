describe('Jest Setup', () => {
  it('should have jest available', () => {
    expect(jest).toBeDefined();
    expect(typeof jest.fn).toBe('function');
  });

  it('should have mocked fetch', () => {
    expect(global.fetch).toBeDefined();
    expect(jest.isMockFunction(global.fetch)).toBe(true);
  });

  it('should work with basic assertions', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toMatch(/hello/);
    expect([1, 2, 3]).toContain(2);
  });

  it('should have Intl mocked', () => {
    const formatter = new Intl.NumberFormat('pt-BR');
    expect(formatter.format).toBeDefined();
  });

  it('should have React Native components mocked', () => {
    const RN = require('react-native');
    expect(RN.Alert).toBeDefined();
    expect(RN.Dimensions).toBeDefined();
    expect(RN.PixelRatio).toBeDefined();
  });
});