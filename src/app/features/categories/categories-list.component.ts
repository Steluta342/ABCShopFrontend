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

  // pt a construi structura tip „părinte → copii”
  rootCategories: Category[] = [];
  childrenMap = new Map<number, Category[]>();

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
        this.buildHierarchy();   //  important pt a construi structura tip „părinte → copii”
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

  // Construim structura tip „părinte → copii”
  private buildHierarchy(): void {
    // categorii de top (fără părinte)
    this.rootCategories = this.categories.filter(c => !c.parent);

    // resetăm mapa
    this.childrenMap.clear();

    // pentru fiecare categorie care ARE părinte, o punem în lista lui
    this.categories.forEach(c => {
      if (c.parent && c.parent.id != null) {
        const parentId = c.parent.id;

        if (!this.childrenMap.has(parentId)) {
          this.childrenMap.set(parentId, []);
        }

        this.childrenMap.get(parentId)!.push(c);
      }
    });
  }

  // helper folosit în template, ca să nu punem logică complicată acolo
  getChildren(parentId?: number): Category[] {
    if (parentId == null) {
      return [];
    }
    return this.childrenMap.get(parentId) || [];
  }
}


