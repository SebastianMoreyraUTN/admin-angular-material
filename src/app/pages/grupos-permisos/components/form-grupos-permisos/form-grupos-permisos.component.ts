import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { DualMultiselectComponent } from 'src/app/shared/dual-multiselect/dual-multiselect.component';
import Swal from 'sweetalert2';
import { ReportesService } from '../../../reportes/services/reportes.service';
import { GruposPermisosService } from '../../services/grupos-permisos.service';
import { Reporte } from '../../../../models/reporte.model';
import { Permiso } from '../../../../models/permiso.model';
import { TablerosService } from '../../../tableros/services/tableros.service';
import { VistasService } from '../../../vistas/services/vistas.service';
import { PresentacionesService } from '../../../presentaciones/services/presentaciones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-grupos-permisos',
  templateUrl: './form-grupos-permisos.component.html',
  styleUrls: ['./form-grupos-permisos.component.scss'],
})
export class FormGruposPermisosComponent implements OnInit {
  reportesSeleccionado: boolean = false;
  vistasSeleccionado: boolean = false;
  tablerosSeleccionado: boolean = false;
  presentacionesSeleccionado: boolean = false;

  titulo = 'Crear Grupo';
  permisos: Permiso[] = [];
  reportes: Reporte[] = [];
  tableros: any[] = [];
  vistas: any[] = [];
  presentaciones: any = [];
  modo = 'crear';
  grupoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });
  scrollToElement: any;
  @ViewChild('multiselect') multiselect: DualMultiselectComponent;
  @ViewChild('prueba') multiselectRef: ElementRef;
  @ViewChild('reportesMultiselect')
  reportesMultiselect: DualMultiselectComponent;
  @ViewChild('vistasMultiselect') vistasMultiselect: DualMultiselectComponent;
  @ViewChild('tablerosMultiselect')
  tablerosMultiselect: DualMultiselectComponent;
  @ViewChild('presentacionesMultiselect')
  presentacionesMultiselect: DualMultiselectComponent;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private reportesService: ReportesService,
    private gruposPermisosService: GruposPermisosService,
    private tablerosService: TablerosService,
    private vistasService: VistasService,
    private presentacionesService: PresentacionesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.gruposPermisosService
      .getPermisos()
      .subscribe((res) => (this.permisos = res));
    this.reportesService
      .getReportes()
      .subscribe((res) => (this.reportes = res));
    this.tablerosService
      .getTableros()
      .subscribe((res) => (this.tableros = res));
    this.vistasService.getVistas().subscribe((res) => (this.vistas = res));
    this.presentacionesService
      .getPresentaciones()
      .subscribe((res) => (this.presentaciones = res));
  }

  mostrarError(formControl) {
    if (formControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (formControl.hasError('email')) {
      return 'Debe ingresar un formato de email válido';
    }
  }

  /*
    El siguiente método recibe como parámetro un string correspondiente
    a un determinado permiso. El primer condicional es para contemplar el caso
    en el que el multiselect todavía no se ha renderizado.
    Si el permiso enviado como argumento es encontrado entre los seleccionados 
    devuelve verdadero.
  */
  permisoSeleccionado(permiso: any): boolean {
    if (!this.multiselect) {
      return false;
    }
    if (
      this.multiselect.seleccionados.find((i) => i.nombre.includes(permiso))
    ) {
      return true;
    }
    return false;
  }

  guardarGrupo(): void {
    if (this.validarPermisosSeleccionados()) {
      if (this.validarReportesSeleccionados()) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'El Usuario ha sido guardado correctamente',
          showConfirmButton: true,
          showCloseButton: true,
        });
      }
    }
  }

  limpiarValores() {
    this.formGroupDirective.resetForm('');
    this.titulo = 'Crear Usuario';
    this.modo = 'crear';
    this.multiselect.limpiar();
  }

  validarPermisosSeleccionados() {
    if (this.multiselect.seleccionados.length > 0) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has asignado ningún permiso al grupo!',
      });
      return false;
    }
  }
  cancelarSeleccion(item): void {
    const permiso = item.nombre.toLowerCase();
    if (permiso.includes('reportes')) {
      this.reportesSeleccionado = false;
    }
    if (permiso.includes('vistas')) {
      this.vistasSeleccionado = false;
    }
    if (permiso.includes('tableros')) {
      this.tablerosSeleccionado = false;
    }
    if (permiso.includes('presentaciones')) {
      this.presentacionesSeleccionado = false;
    }
  }
  notificarSeleccion(item) {
    const idElemento = this.obtenerReferenciaItemSeleccionado(item.nombre);
    if (idElemento) {
      this._snackBar
        .open(item.nombre, 'Ver mas', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        })
        .onAction()
        .subscribe(() => {
          console.log(item);

          if (this.multiselect.seleccionados.includes(item)) {
            const element = document.getElementById(idElemento);
            console.log(element);
            element.scrollIntoView({ block: 'start', behavior: 'smooth' });
          } else {
            this._snackBar.open('Error', 'Has deseleccionado la opción', {
              duration: 1500,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        });
    }
  }

  mostrarTodos() {
    this.reportesSeleccionado = true;
    this.vistasSeleccionado = true;
    this.tablerosSeleccionado = true;
    this.presentacionesSeleccionado = true;
    this._snackBar
      .open('Complete los campos asociados a cada permiso añadido', 'Ver mas', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      })
      .onAction()
      .subscribe(() => {
        const element = document.getElementById('#reportes');
        console.log(element);
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
  }
  quitarTodos() {
    this.reportesSeleccionado = false;
    this.vistasSeleccionado = false;
    this.tablerosSeleccionado = false;
    this.presentacionesSeleccionado = false;
  }

  validarReportesSeleccionados() {
    if (!this.reportesMultiselect) {
      return true;
    } else if (this.reportesMultiselect.seleccionados.length > 0) {
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No has asignado ningún reporte al grupo!',
    });
    return false;
  }

  mapearValores(fila): void {
    this.grupoForm.patchValue({
      nombre: fila.nombre,
    });
    this.multiselect.mapearValores(fila.permisos);

    if (this.permisoSeleccionado('Reportes')) {
      /*
        Utilizo changeDetector para actualizar el DOM y así,
        lograr que se inicialice reportesMultiselect para luego
        poder ejecutar sus métodos.
      */
      this.changeDetector.detectChanges();
      this.reportesMultiselect.mapearValores(fila.reportes);
    }
  }

  obtenerReferenciaItemSeleccionado(nombrePermiso: string): string {
    let permiso: string = nombrePermiso.toLowerCase();
    if (permiso.includes('reportes')) {
      this.reportesSeleccionado = true;
      return '#reportes';
    }
    if (permiso.includes('vistas')) {
      this.vistasSeleccionado = true;
      return '#vistas';
    }
    if (permiso.includes('tableros')) {
      this.tablerosSeleccionado = true;
      return '#tableros';
    }
    if (permiso.includes('presentaciones')) {
      this.presentacionesSeleccionado = true;
      return '#presentaciones';
    } else {
      return '';
    }
  }
}
