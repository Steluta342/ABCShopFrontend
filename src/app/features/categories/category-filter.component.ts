import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
})
export class CategoryFilterComponent implements OnInit {
  categories: Category[] = [];
  rootCategories: Category[] = [];
  childrenMap = new Map<number, Category[]>();
  loading = false;
  error?: string;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.buildHierarchy();
        this.loading = false;
      },
      error: () => {
        this.error = 'Nu am putut încărca categoriile.';
        this.loading = false;
      }
    });
  }

  private buildHierarchy(): void {
    this.rootCategories = this.categories.filter(c => !c.parent);
    this.childrenMap.clear();
    this.categories.forEach(c => {
      const pid = c.parent?.id;
      if (pid != null) {
        if (!this.childrenMap.has(pid)) this.childrenMap.set(pid, []);
        this.childrenMap.get(pid)!.push(c);
      }
    });
  }

  getChildren(parentId?: number): Category[] {
    if (parentId == null) return [];
    return this.childrenMap.get(parentId) || [];
  }
}
