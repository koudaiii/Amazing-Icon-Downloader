const popup = require('./popup');
const fetchMock = require('fetch-mock-jest');

const {
  getSymbols,
  showURLErrorMessage,
  getCurrentTab,
  getWebContainerSVG,
  findSVGURLs,
} = popup;

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

describe('getWebContainerSVG', () => {
  it('should return an array of SVG elements', () => {
    // Arrange
    const svgElement1 = document.createElement('svg');
    const svgElement2 = document.createElement('svg');
    document.body.appendChild(svgElement1);
    document.body.appendChild(svgElement2);

    // Act
    const result = getWebContainerSVG();

    // Assert
    expect(result).toEqual([svgElement1, svgElement2]);
  });
});

describe('findSVGURLs', () => {
  beforeEach(() => {
    // Reset the document body before each test
    document.body.innerHTML = '';
  });

  it('should return an empty array if no SVG URLs are found', () => {
    // Act
    const result = findSVGURLs();

    // Assert
    expect(result).toEqual([]);
  });

  it('should return an array of SVG URLs', () => {
    // Arrange
    const svgElement1 = document.createElement('img');
    svgElement1.src = 'image1.svg';
    document.body.appendChild(svgElement1);

    const svgElement2 = document.createElement('img');
    svgElement2.src = 'image2.svg';
    document.body.appendChild(svgElement2);

    const nonSvgElement = document.createElement('img');
    nonSvgElement.src = 'image3.png';
    document.body.appendChild(nonSvgElement);

    // Act
    const result = findSVGURLs();

    // Assert
    expect(result).toEqual([svgElement1, svgElement2]);
  });
});
