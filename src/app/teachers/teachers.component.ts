import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];
  showForm: boolean = false;
  editingTeacher: any = null;
  formData: any = {
    id: '',
    teacher_id: '',
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    phone: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  // Load all teachers
  loadTeachers(): void {
    this.dataService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err) => {
        console.error('Error fetching teachers:', err.message);
      }
    });
  }

  // Show form for adding a teacher
  addTeacher(): void {
    this.showForm = true;
    this.editingTeacher = null;
    this.formData = {
      id: '',
      teacher_id: '',
      first_name: '',
      last_name: '',
      email: '',
      department: '',
      phone: ''
    };
  }

  // Show form for editing a teacher
  editTeacher(teacher: any): void {
    this.showForm = true;
    this.editingTeacher = teacher;
    this.formData = { ...teacher };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editingTeacher) {
      // Update teacher
      this.dataService.updateTeacher(this.formData.id, this.formData).subscribe({
        next: () => {
          this.updateLocalTeacher(this.formData.id, this.formData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating teacher:', err.message);
        }
      });
    } else {
      // Add new teacher with a unique ID
      const newTeacher = {
        ...this.formData,
        id: uuidv4(), // Generate a unique ID for the new teacher
        teacher_id: this.formData.teacher_id || uuidv4().slice(0, 6).toUpperCase() // Generate a short unique teacher_id
      };

      this.dataService.addTeacher(newTeacher).subscribe({
        next: (newTeacherFromServer) => {
          this.teachers.push(newTeacherFromServer);
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding teacher:', err.message);
        }
      });
    }
  }

  // Delete a teacher
  deleteTeacher(teacher: any): void {
    this.dataService.deleteTeacher(teacher.id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter((t) => t.id !== teacher.id);
      },
      error: (err) => {
        console.error('Error deleting teacher:', err.message);
      }
    });
  }

  // Cancel form
  cancel(): void {
    this.showForm = false;
    this.editingTeacher = null;
  }

  // Update local array
  private updateLocalTeacher(id: string, updatedData: any): void {
    const index = this.teachers.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.teachers[index] = updatedData;
    }
  }
}
