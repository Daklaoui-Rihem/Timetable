import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  showForm: boolean = false;
  editingRoom: any = null;
  formData: any = {
    id: '',
    room_id: '',
    room_name: '',
    capacity: 0,
    building: '',
    floor: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  // Load rooms
  loadRooms(): void {
    this.dataService.getRooms().subscribe({
      next: (data) => {
        console.log('Rooms loaded successfully:', data);
        this.rooms = data;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err.message);
        alert('Failed to load rooms. Please try again later.');
      }
    });
  }

  // Show form to add a new room
  addRoom(): void {
    this.showForm = true;
    this.editingRoom = null;
    this.formData = {
      id: '',
      room_id: '',
      room_name: '',
      capacity: 0,
      building: '',
      floor: 0
    };
  }

  // Show form to edit an existing room
  editRoom(room: any): void {
    this.showForm = true;
    this.editingRoom = room;
    this.formData = { ...room };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.editingRoom) {
      // Update
      console.log('Updating room:', this.formData);
      this.dataService.updateRoom(this.formData.id, this.formData).subscribe({
        next: () => {
          console.log('Room updated successfully');
          this.updateLocalRoom(this.formData.id, this.formData);
          this.cancel();
        },
        error: (err) => {
          console.error('Error updating room:', err.message);
          alert('Failed to update room. Please try again.');
        }
      });
    } else {
      // Add
      const newRoom = {
        ...this.formData,
        id: this.formData.id || uuidv4()
      };

      console.log('Adding new room:', newRoom);

      this.dataService.addRoom(newRoom).subscribe({
        next: (roomFromServer) => {
          console.log('Room added successfully:', roomFromServer);
          this.rooms.push(roomFromServer);
          this.cancel();
        },
        error: (err) => {
          console.error('Error adding room:', err.message);
          alert('Failed to add room. Please try again.');
        }
      });
    }
  }

  // Delete room
  deleteRoom(room: any): void {
    const roomId = room.id;
    console.log('Deleting room with ID:', roomId);

    this.dataService.deleteRoom(roomId).subscribe({
      next: () => {
        console.log(`Room with ID ${roomId} deleted successfully`);
        this.rooms = this.rooms.filter((r) => r.id !== roomId);
      },
      error: (err) => {
        console.error('Error deleting room:', err.message);
        alert('Failed to delete room. Please try again.');
      }
    });
  }

  // Cancel form
  cancel(): void {
    this.showForm = false;
    this.editingRoom = null;
  }

  // Update local room array
  private updateLocalRoom(id: string, updatedData: any): void {
    const index = this.rooms.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.rooms[index] = updatedData;
    }
  }
}
