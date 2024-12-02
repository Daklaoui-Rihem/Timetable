import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBaseUrl = 'http://localhost:3000'; // Base URL for your JSON server

  constructor(private http: HttpClient) {}

  // Fetch all classes
  getData(endpoint: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${endpoint}`;
    console.log('GET request to:', url);
    return this.http.get(url);
  }

  // Add a new class
  addData(data: any): Observable<any> {
    const url = `${this.apiBaseUrl}/classes`;
    console.log('POST request to:', url, 'with data:', data);
    return this.http.post(url, data); // Ensure new data includes an ID
  }

  // Update an existing class
  updateData(id: string, data: any): Observable<any> {
    const url = `${this.apiBaseUrl}/classes/${id}`;
    console.log('PUT request to:', url, 'with data:', data);
    return this.http.put(url, data);
  }

  // Delete a class
  deleteData(id: string): Observable<any> {
    const url = `${this.apiBaseUrl}/classes/${id}`;
    console.log('DELETE request to:', url);
    return this.http.delete(url);
  }

  // Fetch all rooms
getRooms(): Observable<any> {
  const url = `${this.apiBaseUrl}/rooms`;
  console.log('GET request to:', url);
  return this.http.get(url);
}

// Add a new room
addRoom(data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/rooms`;
  console.log('POST request to:', url, 'with data:', data);
  return this.http.post(url, data);
}

// Update an existing room
updateRoom(id: string, data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/rooms/${id}`;
  console.log('PUT request to:', url, 'with data:', data);
  return this.http.put(url, data);
}

// Delete a room
deleteRoom(id: string): Observable<any> {
  const url = `${this.apiBaseUrl}/rooms/${id}`;
  console.log('DELETE request to:', url);
  return this.http.delete(url);
}

// Fetch all sessions
getSessions(): Observable<any> {
  const url = `${this.apiBaseUrl}/sessions`;
  console.log('GET request to:', url);
  return this.http.get(url);
}

// Add a new session
addSession(data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/sessions`;
  console.log('POST request to:', url, 'with data:', data);
  return this.http.post(url, data);
}

// Update a session
updateSession(id: string, data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/sessions/${id}`;
  console.log('PUT request to:', url, 'with data:', data);
  return this.http.put(url, data);
}

// Delete a session
deleteSession(id: string): Observable<any> {
  const url = `${this.apiBaseUrl}/sessions/${id}`;
  console.log('DELETE request to:', url);
  return this.http.delete(url);
}


// Fetch all students
getStudents(): Observable<any> {
  const url = `${this.apiBaseUrl}/students`;
  console.log('GET request to:', url);
  return this.http.get(url);
}

// Add a new student
addStudent(data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/students`;
  console.log('POST request to:', url, 'with data:', data);
  return this.http.post(url, data);
}

// Update a student
updateStudent(id: string, data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/students/${id}`;
  console.log('PUT request to:', url, 'with data:', data);
  return this.http.put(url, data);
}

// Delete a student
deleteStudent(id: string): Observable<any> {
  const url = `${this.apiBaseUrl}/students/${id}`;
  console.log('DELETE request to:', url);
  return this.http.delete(url);
}


// Fetch all subjects
getSubjects(): Observable<any> {
  const url = `${this.apiBaseUrl}/subjects`;
  return this.http.get(url);
}

// Add a new subject
addSubject(data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/subjects`;
  return this.http.post(url, data);
}

// Update a subject
updateSubject(id: string, data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/subjects/${id}`;
  return this.http.put(url, data);
}

// Delete a subject
deleteSubject(id: string): Observable<any> {
  const url = `${this.apiBaseUrl}/subjects/${id}`;
  return this.http.delete(url);
}

// Fetch all teachers
getTeachers(): Observable<any> {
  const url = `${this.apiBaseUrl}/teachers`;
  return this.http.get(url);
}

// Add a new teacher
addTeacher(data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/teachers`;
  return this.http.post(url, data);
}

// Update a teacher
updateTeacher(id: string, data: any): Observable<any> {
  const url = `${this.apiBaseUrl}/teachers/${id}`;
  return this.http.put(url, data);
}

// Delete a teacher
deleteTeacher(id: string): Observable<any> {
  const url = `${this.apiBaseUrl}/teachers/${id}`;
  return this.http.delete(url);
}
}
