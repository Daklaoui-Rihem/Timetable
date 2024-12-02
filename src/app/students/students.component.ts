import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  showForm: boolean = false;
  editingStudent: any = null;
  formData: any = {
    id: '',
    student_id: '',
    first_name: '',
    last_name: '',
    email: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Load all students
  loadStudents(): void {
    this.dataService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Error fetching students:', err.message);
      }
    });
  }

  // Show form for adding a student
  addStudent(): void {
    this.showForm = true;
    this.editingStudent = null;
    this.formData = {
      id: '',
      student_id: '',
      first_name: '',
      last_name: '',
      email: ''
    };
  }

  // Show form for editing a student
  editStudent(student: any): void {
    this.showForm = true;
    this.editingStudent = student;
    this.formData = { ...student };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editingStudent) {
      // Update student
      this.dataService.updateStudent(this.formData.id, this.formData).subscribe({
        next: () => {
          this.updateLocalStudent(this.formData.id, this.formData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating student:', err.message);
        }
      });
    } else {
      // Add new student with a unique ID
      const newStudent = {
        ...this.formData,
        id: uuidv4(), // Generate a unique ID for the new student
        student_id: this.formData.student_id || uuidv4().slice(0, 6).toUpperCase() // Optional: Generate a short unique student_id
      };

      this.dataService.addStudent(newStudent).subscribe({
        next: (newStudentFromServer) => {
          this.students.push(newStudentFromServer);
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding student:', err.message);
        }
      });
    }
  }

  // Delete a student
  deleteStudent(student: any): void {
    this.dataService.deleteStudent(student.id).subscribe({
      next: () => {
        this.students = this.students.filter((s) => s.id !== student.id);
      },
      error: (err) => {
        console.error('Error deleting student:', err.message);
      }
    });
  }

  // Cancel form
  cancel(): void {
    this.showForm = false;
    this.editingStudent = null;
  }

  // Update local array
  private updateLocalStudent(id: string, updatedData: any): void {
    const index = this.students.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.students[index] = updatedData;
    }
  }
}
