import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-xy-dialog',
  templateUrl: './xy-dialog.component.html',
  styleUrls: ['./xy-dialog.component.scss']
})
export class XyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    data: any[];
    category: string;
    values: any[];
    title: string;
    drillDowns: any[];
  }) { }

  ngOnInit(): void {
  }

}
