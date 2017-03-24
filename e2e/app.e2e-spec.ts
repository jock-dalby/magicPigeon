import { MagicPigeonPage } from './app.po';

describe('magic-pigeon App', () => {
  let page: MagicPigeonPage;

  beforeEach(() => {
    page = new MagicPigeonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
