import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpenUiElements = false;
  menuOpts:Observable<any>;
  constructor(private dataService:DataService) {}
  

  ngOnInit() {
    this.menuOpts = this.dataService.getMenuOpts();
  }
}
