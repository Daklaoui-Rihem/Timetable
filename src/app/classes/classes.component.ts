import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: any[] = []; // Local storage for classes
  showForm: boolean = false;
  editingClass: any = null; // Currently editing class
  formData: any = {
    id: '',
    class_id: '',
    class_name: '',
    subject_id: '',
    students: '' // Store as a comma-separated string for simplicity
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  // Load classes from the API
  loadClasses(): void {
    this.dataService.getData('classes').subscribe({
      next: (data) => {
        console.log('Classes loaded successfully:', data);
        this.classes = data; // Populate classes array
      },
      error: (err) => {
        console.error('Error fetching classes:', err.message);
        alert('Failed to load classes. Please try again later.');
      }
    });
  }

  // Show form to add a new class
  addClass(): void {
    this.showForm = true;
    this.editingClass = null;
    this.formData = {
      id: '',
      class_id: '',
      class_name: '',
      subject_id: '',
      students: ''
    };
  }

  // Show form to edit an existing class
  editClass(classObj: any): void {
    this.showForm = true;
    this.editingClass = classObj;
    this.formData = {
      ...classObj,
      students: Array.isArray(classObj.students) ? classObj.students.join(', ') : classObj.students
    };
  }

  // Handle form submission (add or update)
  onSubmit(): void {
    // Convert students string to array
    const updatedData = {
      ...this.formData,
      students: this.formData.students.split(',').map((s: string) => s.trim())
    };

    if (this.editingClass) {
      // Update operation
      console.log('Updating class:', updatedData);
      this.dataService.updateData(this.formData.id, updatedData).subscribe({
        next: () => {
          console.log('Class updated successfully');
          this.updateLocalClass(this.formData.id, updatedData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating class:', err.message);
          alert('Failed to update class. Please try again.');
        }
      });
    } else {
      // Add operation
      // Generate a unique ID if not provided
      const newClass = {
        ...updatedData,
        id: this.formData.id || this.generateUniqueId()
      };

      console.log('Adding new class:', newClass);

      this.dataService.addData(newClass).subscribe({
        next: (newClassFromServer) => {
          console.log('Class added successfully:', newClassFromServer);
          this.classes.push(newClassFromServer); // Add to local array
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding class:', err.message);
          alert('Failed to add class. Please try again.');
        }
      });
    }
  }

  // Delete a class
  deleteClass(classObj: any): void {
    const classId = classObj.id; // Use ID for deletion
    console.log('Deleting class with ID:', classId);

    this.dataService.deleteData(classId).subscribe({
      next: () => {
        console.log(`Class with ID ${classId} deleted successfully`);
        this.classes = this.classes.filter((c) => c.id !== classId); // Remove from local array
      },
      error: (err) => {
        console.error('Error deleting class:', err.message);
        alert('Failed to delete class. Please try again.');
      }
    });
  }

  // Cancel the form
  cancel(): void {
    this.showForm = false;
    this.editingClass = null;
  }

  // Update local class array after edit
  private updateLocalClass(id: string, updatedData: any): void {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.classes[index] = updatedData;
    }
  }

  // Generate a unique ID using UUID
  private generateUniqueId(): string {
    return uuidv4();
  }
}
