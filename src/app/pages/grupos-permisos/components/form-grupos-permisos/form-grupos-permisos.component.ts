import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
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

@Component({
  selector: 'app-form-grupos-permisos',
  templateUrl: './form-grupos-permisos.component.html',
  styleUrls: ['./form-grupos-permisos.component.scss'],
})
export class FormGruposPermisosComponent implements OnInit {
  titulo = 'Crear Grupo';
  @Input() permisos: string[] = [];
  reportes: any[] = [];
  modo = 'crear';
  grupoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });

  @ViewChild('multiselect') multiselect: DualMultiselectComponent;
  @ViewChild('reportesMultiselect')
  reportesMultiselect: DualMultiselectComponent;
  @ViewChild('vistas') vistasMultiselect: DualMultiselectComponent;
  @ViewChild('tableros') tablerosMultiselect: DualMultiselectComponent;
  @ViewChild('presentaciones')
  presentacionesMultiselect: DualMultiselectComponent;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private reportesService: ReportesService,
    private gruposPermisosService: GruposPermisosService
  ) {}

  ngOnInit(): void {
    this.reportesService.getReportes().subscribe((res) => {
      res.map((element) => {
        this.reportes.push(element.nombre);
      });
    });
    this.gruposPermisosService.getPermisos().subscribe((res) => {
      res.map((element) => this.permisos.push(element.nombre));
      this.multiselect.actualizarValores();
    });
  }

  mostrarError(formControl) {
    if (formControl.hasError('required')) {
      return 'Debe ingresar un valor';
    }
    if (formControl.hasError('email')) {
      return 'Debe ingresar un formato de email válido';
    }
  }

  permisoSeleccionado(permiso: string): boolean {
    if (!this.multiselect) {
      return false;
    }
    if (this.multiselect.seleccionados.find((i) => i.includes(permiso))) {
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
        text: 'No has asignado ningún grupo al usuario!',
      });
      return false;
    }
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
}
