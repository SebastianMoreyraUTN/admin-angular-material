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
import { Grupo } from '../../../../models/grupo.model';
import { object } from '@amcharts/amcharts4/core';
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
  requiredErrorEnMultiselects = '';
  grupoActual: Grupo = new Grupo();

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
      let grupo: Grupo = new Grupo();
      this.grupoActual.nombre = this.grupoForm.get('nombre').value;
      this.grupoActual.permisos = this.multiselect.seleccionados;
      this.validarCadaMultiselect();
      if (!this.requiredErrorEnMultiselects) {
        console.log(this.grupoActual);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'El Usuario ha sido guardado correctamente',
          showConfirmButton: true,
          showCloseButton: true,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: `No se han asignado ${this.requiredErrorEnMultiselects}`,
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
  /*
    El método cancelarSelección se ejecuta cada vez que
    se quita un item de la lista de seleccionados del multiselect.
    Si un elemento es quitado, automáticamente ocultaremos el multiselect
    que se corresponde al elemento.
  */
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

  /*
    El método notificarSelección se ejecuta cada vez que
    se agrega un item a la lista de seleccionados del multiselect.
    Si un elemento es agregad, automáticamente mostraremos una notificación
    que nos permitirá hacer un "scroll" hasta el multiselect correspondiente.
  */
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

  /* 
    Retorna el Id del contenedor del multiselect correspondiente al
    ítem seleccionado, además de encargarse de setear en TRUE la propiedad que
    determina si se muestra o no el multiselect del permiso correspondiente.
  */
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

  /*
    Se valida que cada permiso seleccionado tenga al menos
    una opción elegida en su correspondiente multiselect.
    Recibe un grupo como parámetro para poder asignarle al mismo,
    en cada array de permisos,las opciones elegidas en cada multiselect.
  
    */
  validarCadaMultiselect(): void {
    this.requiredErrorEnMultiselects = '';
    this.tieneItemsSeleccionados(
      this.reportesSeleccionado,
      'reportes',
      this.reportesMultiselect,
      'Reportes'
    );
    this.tieneItemsSeleccionados(
      this.vistasSeleccionado,
      'vistas',
      this.vistasMultiselect,
      'Vistas'
    );
    this.tieneItemsSeleccionados(
      this.tablerosSeleccionado,
      'tableros',
      this.tablerosMultiselect,
      'Tableros'
    );
    this.tieneItemsSeleccionados(
      this.presentacionesSeleccionado,
      'presentaciones',
      this.presentacionesMultiselect,
      'Presentaciones'
    );
  }

  /* 
    permisoSelccionado: para determinar si un permiso ha sido elegido.
    objectKey: nombre de la propiedad que se corresponde con el array de opciones
    de un permiso seleccionado. Por ejemplo: objectKey = 'reportes'. De esta manera 
    asignaremos los reportes seleccionados al array de reportes.
    permisoMultiselect: multiselect correspondiente al permiso.
    sinItems: string que se le concatena a this.requiredErrorEnMultiselects 
    en caso de que el multiselect no tenga items seleccionados.
  */
  tieneItemsSeleccionados(
    permisoSeleccionado: boolean,
    objectKey: string,
    permisoMultiselect: DualMultiselectComponent,
    sinItems: string
  ): void {
    this.grupoActual[objectKey] = [];
    if (permisoSeleccionado) {
      this.grupoActual[objectKey] = permisoMultiselect.seleccionados;
      if (permisoMultiselect.seleccionados.length < 1) {
        this.requiredErrorEnMultiselects = `${this.requiredErrorEnMultiselects} ${sinItems}`;
      }
    }
  }
}
