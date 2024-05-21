const { getSymbols } = require('./popup');
const fetchMock = require('fetch-mock-jest');

describe('getSymbols', () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    fetchMock.reset();
  });

  it('should return the FxSymbolContainer element', () => {
    // Arrange
    const expectedElement = document.createElement('div');
    expectedElement.id = 'FxSymbolContainer';
    document.body.appendChild(expectedElement);

    // Act
    const result = getSymbols();

    // Assert
    expect(result).toBe(expectedElement);
  });
});
