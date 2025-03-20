import { DepartmentFilterPipe } from './department-search.pipe';

describe('DepartmentSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new DepartmentFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
