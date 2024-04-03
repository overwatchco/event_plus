import { getImages } from '@/actions/image-actions'
import { Requerimiento } from '@prisma/client'
import { AlignmentType, ImageRun, TextRun, WidthType } from 'docx'
import { Paragraph, Table, TableCell, TableRow, VerticalAlign } from 'docx'




interface Imagen {
    id: string
    fileKey: string
    urlPath: string
    requerimientoId: string
}

export class TableCreator {
    public CreateTable(requerimiento: Requerimiento[]): Table {
        let rows = []
        let rowsEvidencias: any[] = []
        //create header row
        rows.push(new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Evento",
                                    bold: true
                                }),
                            ]
                        })
                    ]
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Encargado",
                                    bold: true
                                }),
                            ]
                        })
                    ]
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Fecha",
                                    bold: true
                                }),
                            ]
                        })
                    ]
                })
            ]
        }))
        //loop thru each of the schedule elements
        requerimiento.forEach(s => {
            //push a new row element based on the schedule sent in
            rows.push(this._createRow(s))
        })
        //create a new table element and set to 100% width
        let table: Table = new Table({
            rows: rows,
            width: {
                size: 100,
                type: WidthType.PERCENTAGE
            }
        })

        //return the table
        return (table)
    }


    //function to create a table row easily
    private _createRow(requerimiento: Requerimiento):
        TableRow {
        //create a row with all the cells
        //NOTE: the children has to have a paragraph elements
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            text: requerimiento.subevento,
                        }),
                    ]
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: requerimiento.item,
                        }),
                    ]
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: requerimiento.fecha.toDateString(),
                            alignment: AlignmentType.RIGHT
                        }),
                    ]
                }),
            ]
        })
    }


}