import { FirstAngularCrudAppPage } from './app.po';

describe('first-angular-crud-app App', function() {
  let page: FirstAngularCrudAppPage;

  beforeEach(() => {
    page = new FirstAngularCrudAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
