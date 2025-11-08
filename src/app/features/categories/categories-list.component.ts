import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../core/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  loading = false;
  error?: string;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.error = undefined;

    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.loading = false;
        console.log('Categorii primite: ', data);
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Nu am putut încărca categoriile.';
        this.loading = false;
      }
    });
  }
}
