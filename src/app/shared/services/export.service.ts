import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private datePipe: DatePipe
  ) { }

  generateExcel(fileName: string, title: string, headers: string[], data: any[]) {

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Car Data');

    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Times New Roman', family: 4, size: 20, bold: true };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('A1:F2');

    const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    subTitleRow.font = { name: 'Times New Roman', family: 3, size: 14, italic: true };
    subTitleRow.alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.mergeCells('A3:F3');

    worksheet.addRow([]);

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { name: 'Times New Roman', family: 4, size: 14, bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0000ff' },
        bgColor: { argb: 'ff0000' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin'} };
    });
    data.forEach(d => {
      const row = worksheet.addRow(d);
      row.font = { name: 'Times New Roman', family: 4, size: 14 };
      row.eachCell((cell, colNumber) => {
        cell.border = { top: { style: 'thin'}, left: { style: 'thin'}, bottom: { style: 'thin'}, right: { style: 'thin'} };
      });
    });

    workbook.xlsx.writeBuffer()
      .then((d) => {
        this.saveExcelFile(d, fileName + '.xlsx');
      });
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    FileSaver.saveAs(data, fileName);
  }

  generateCsv(fileName: string, title: string, headers: string[], data: any[]) {
    const csvOptions = {
      fieldSeparator: '-',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabel: true,
      showTitle: true,
      title,
      usrBom: true,
      noDownload: false,
      headers
    };

    this.saveCSVFile(data, fileName, csvOptions);

  }

  saveCSVFile(data: any[], fileName: string, options: any) {
    const download = new AngularCsv(data, fileName, options);
  }
}
