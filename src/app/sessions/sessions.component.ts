import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessions: any[] = [];
  showForm: boolean = false;
  editingSession: any = null;
  formData: any = {
    id: '',
    session_id: '',
    subject_id: '',
    teacher_id: '',
    room_id: '',
    class_id: '',
    session_date: '',
    start_time: '',
    end_time: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  // Load all sessions
  loadSessions(): void {
    this.dataService.getSessions().subscribe({
      next: (data) => {
        this.sessions = data;
      },
      error: (err) => {
        console.error('Error fetching sessions:', err.message);
      }
    });
  }

  // Show form for adding a session
  addSession(): void {
    this.showForm = true;
    this.editingSession = null;
    this.formData = {
      id: '',
      session_id: '',
      subject_id: '',
      teacher_id: '',
      room_id: '',
      class_id: '',
      session_date: '',
      start_time: '',
      end_time: ''
    };
  }

  // Show form for editing a session
  editSession(session: any): void {
    this.showForm = true;
    this.editingSession = session;
    this.formData = { ...session };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editingSession) {
      // Update session
      this.dataService.updateSession(this.formData.id, this.formData).subscribe({
        next: () => {
          this.updateLocalSession(this.formData.id, this.formData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating session:', err.message);
        }
      });
    } else {
      // Add new session with a unique ID
      const newSession = {
        ...this.formData,
        id: uuidv4(),
        session_id: this.formData.session_id || uuidv4().slice(0, 6).toUpperCase()
      };

      this.dataService.addSession(newSession).subscribe({
        next: (newSessionFromServer) => {
          this.sessions.push(newSessionFromServer);
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding session:', err.message);
        }
      });
    }
  }

  // Delete a session
  deleteSession(session: any): void {
    this.dataService.deleteSession(session.id).subscribe({
      next: () => {
        this.sessions = this.sessions.filter((s) => s.id !== session.id);
      },
      error: (err) => {
        console.error('Error deleting session:', err.message);
      }
    });
  }

  // Cancel form
  cancel(): void {
    this.showForm = false;
    this.editingSession = null;
  }

  // Update local array
  private updateLocalSession(id: string, updatedData: any): void {
    const index = this.sessions.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.sessions[index] = updatedData;
    }
  }
}
