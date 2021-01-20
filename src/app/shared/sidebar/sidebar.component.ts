import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { options } from '../../../assets/data/menu.opts';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpenUiElements = false;
  menuOpts:any[] = options;
  constructor(private dataService:DataService) {}
  

}
