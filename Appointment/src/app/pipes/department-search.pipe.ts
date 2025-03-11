import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true, 
  name: 'departmentFilter'
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(departments: any[], searchText: string): any[] {
    if (!departments || !searchText) {
      return departments;
    }

    return departments.filter(department =>
      department.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
