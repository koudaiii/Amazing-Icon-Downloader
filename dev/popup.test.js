const popup = require('./popup');
const fetchMock = require('fetch-mock-jest');

const { getSymbols, showURLErrorMessage, getCurrentTab } = popup;

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

describe('showURLErrorMessage', () => {
  it('should update the bodyContent element with the error message', () => {
    // Arrange
    const bodyContentElement = document.createElement('div');
    bodyContentElement.id = 'bodyContent';
    document.body.appendChild(bodyContentElement);

    // Act
    showURLErrorMessage();

    // Assert
    const errorMessage = `
      <i style="grid-column: span 3; color: darkred;">
        Amazing Icon Downloader does not work for this URL.
        <br>
        Currently this extension only works on:
        <ul>
          <li>portal.azure.com</li>
          <li>endpoint.microsoft.com</li>
        </ul>
        <br>
        Contact <a href="mailto:matt@mattlag.com">matt@mattlag.com</a> for help.
      </i>`;
    expect(bodyContentElement.innerHTML).toBe(errorMessage);
  });
});

describe('getCurrentTab', () => {
  it('should return the current active tab', async () => {
    // Arrange
    const queryOptions = { active: true, lastFocusedWindow: true };
    const expectedTab = { id: 1, url: 'https://example.com' };
    chrome.tabs.query.mockResolvedValue([expectedTab]);

    // Act
    const result = await getCurrentTab();

    // Assert
    expect(chrome.tabs.query).toHaveBeenCalledWith(queryOptions);
    expect(result).toBe(expectedTab);
  });
});
