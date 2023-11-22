import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  title = 'lista de tareas';
  taskForm: FormGroup;
  taskList: any[] = [];
  usuario: string = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      newTask: ['']
    });
    this.usuario = JSON.stringify(localStorage.getItem('usuario'));
  }
  addTask(event: any) {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.get('newTask')?.value;
      if (newTask !== null) {
        this.taskList.push({ task: newTask, selected: false });
        this.taskForm.reset();
      } else {
        console.error('El valor de newTask es null.');
      }
    }
  }

  removeTask(index: number) {
    this.taskList.splice(index, 1);
  }

  openConfirmationModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.router.navigate(['login']);
        }
      }
    );
    }
}
