import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { SessionsComponent } from './sessions/sessions.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'students', component: StudentsComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
