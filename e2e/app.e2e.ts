import { browser, by, element } from 'protractor';

const expect = chai.expect;

describe('App', () => {
  before(async () => {
    await browser.get('/');
  });

  beforeEach(() => {});

  it('should be on home page', async () => {
    const value = await element
      .all(by.css('h1'))
      .get(0)
      .getText();
    expect(value).to.be.equal('Angular Default ICDC Template');
  });
});
