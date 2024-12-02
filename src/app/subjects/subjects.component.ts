import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  showForm: boolean = false;
  editingSubject: any = null;
  formData: any = {
    id: '',
    subject_id: '',
    subject_name: '',
    subject_code: '',
    department: '',
    description: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  // Load all subjects
  loadSubjects(): void {
    this.dataService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (err) => {
        console.error('Error fetching subjects:', err.message);
      }
    });
  }

  // Show form for adding a subject
  addSubject(): void {
    this.showForm = true;
    this.editingSubject = null;
    this.formData = {
      id: '',
      subject_id: '',
      subject_name: '',
      subject_code: '',
      department: '',
      description: ''
    };
  }

  // Show form for editing a subject
  editSubject(subject: any): void {
    this.showForm = true;
    this.editingSubject = subject;
    this.formData = { ...subject };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editingSubject) {
      // Update subject
      this.dataService.updateSubject(this.formData.id, this.formData).subscribe({
        next: () => {
          this.updateLocalSubject(this.formData.id, this.formData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating subject:', err.message);
        }
      });
    } else {
      // Add new subject with a unique ID
      const newSubject = {
        ...this.formData,
        id: uuidv4(), // Generate a unique ID for the new subject
        subject_id: this.formData.subject_id || uuidv4().slice(0, 6).toUpperCase() // Optional: Generate a short unique subject_id
      };

      this.dataService.addSubject(newSubject).subscribe({
        next: (newSubjectFromServer) => {
          this.subjects.push(newSubjectFromServer);
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding subject:', err.message);
        }
      });
    }
  }

  // Delete a subject
  deleteSubject(subject: any): void {
    this.dataService.deleteSubject(subject.id).subscribe({
      next: () => {
        this.subjects = this.subjects.filter((s) => s.id !== subject.id);
      },
      error: (err) => {
        console.error('Error deleting subject:', err.message);
      }
    });
  }

  // Cancel form
  cancel(): void {
    this.showForm = false;
    this.editingSubject = null;
  }

  // Update local array
  private updateLocalSubject(id: string, updatedData: any): void {
    const index = this.subjects.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.subjects[index] = updatedData;
    }
  }
}
