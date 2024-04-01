import { Document, HeadingLevel, ImageRun, Packer, Paragraph, SectionType, Table, TextRun } from "docx"
import { saveAs } from "file-saver"
import { TableCreator } from "./createTable"
import { getImages } from "@/actions/image-actions";

const exampleTest = {
    "id": "6796fe09-7e39-4db4-846f-823e25c2e92a",
    "nombre": "Prueba evento",
    "descripcion": "Descripcion Prueba",
    "contratoId": "56c71f67-7e07-43f3-bfe2-73a6e62dd4e3",
    "Items": [
        {
            "id": "02fd578e-7778-4e00-a951-8541d88b83b2",
            "servicio": "Servicio Prueba",
            "descripcion": "Descripcion Prueba",
            "eventoId": "6796fe09-7e39-4db4-846f-823e25c2e92a",
            "Requerimiento": [
                {
                    "id": "b33d9f77-aacd-4a15-a40f-9f45200375ed",
                    "subevento": "Subevento Prueba",
                    "item": "Subitem prueba",
                    "fecha": "2024-03-28T05:00:00.000Z",
                    "itemsId": "02fd578e-7778-4e00-a951-8541d88b83b2"
                }
            ]
        }
    ]
}


async function generateFromUrl(url: string) {
    const blob = await fetch(
        url
    ).then(r => r.blob());
}

const text = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ornare ligula. Curabitur eget nisl sed mauris ultrices egestas. Suspendisse potenti. Etiam nec nisl laoreet sapien mollis vestibulum. Curabitur in lectus vitae nibh fermentum dignissim vel eget mauris. Mauris viverra sagittis felis, nec posuere tortor convallis vitae. Sed at sem lacinia, tristique lectus ac, tincidunt quam. Aliquam et porta leo, a vulputate massa. Sed et orci auctor, vulputate ex eget, blandit libero. Cras varius elementum euismod. Duis in augue eget lorem condimentum imperdiet efficitur sed turpis. Cras mattis lacus nec sem malesuada, nec viverra sem venenatis. Fusce mi metus, pretium nec tortor id, tempor mattis erat. Praesent orci nisi, posuere at arcu quis, finibus porta risus. Morbi luctus ante in condimentum aliquet." '

export async function generateFile(evento: any) {

    const tablaRequerimientos = new TableCreator()


    //NOTE: PORTADA DEL DOCUMENTO
    const titulo = new Paragraph({
        text: "Titulo del documento",
        heading: "Title",
        alignment: "center",
    })


    const numeroContrato = new Paragraph({
        run: {
            size: 20,
            bold: true,
        },
        text: "CONTRATO NO.25292-11",
        alignment: "center",
    })


    const descripcionEvento = new Paragraph({
        run: {
            size: 20,
        },
        text: text,
        alignment: "distribute",
    })


    //NOTE: ITEMS DEL DOCUMENTO

    let items = []

    for (let index = 0; index < exampleTest.Items.length; index++) {
        const item = exampleTest.Items[index]

        items.push(


            new Paragraph({
                text: `Item ${index + 1}. ` + item.servicio,
                heading: "Heading1",
                alignment: "left"
            }),


            new Paragraph({
                run: {
                    size: 20,
                },
                text: `DESCRIPCION: ${item.descripcion}`,
                alignment: "left"
            }),

            tablaRequerimientos.CreateTable(item.Requerimiento),




            new Paragraph({
                text: 'REGISTRO FOTOGRÁFICO',
                heading: "Heading1",
                alignment: "left",

                children: [

                    

                ]
            }),





        )

    }


    const doc = new Document({

        creator: "Event Plus",
        title: "Documento evidencias",
        // NOTE: CONFIGURACION DE LOS ESTILOS DEL DOCUMENTO
        styles: {
            default: {
                document: {
                    run: {
                        font: "Arial",
                        size: 20,
                    }
                },
                title: {
                    run: {
                        bold: true,
                        allCaps: true
                    }
                },
                heading1: {
                    run: {
                        bold: true,
                    }
                },
                heading2: {
                    run: {
                        bold: false,
                        allCaps: true
                    }
                },

            }
        },

        sections: [
            {
                properties: {
                    type: "nextPage"
                },
                // NOTE: PORTADA DEL DOCUMENTO
                children: [
                    titulo,
                    numeroContrato,
                    descripcionEvento
                ]
            },
            {
                properties: {
                    type: "nextPage"
                },
                // NOTE: ITEMS DEL DOCUMENTO 
                children: items
            },
            {
                properties: {
                    type: "nextPage"
                },
                // NOTE: ITEMS DEL DOCUMENTO 
                children: items
            }
        ],

    })



    Packer.toBlob(doc).then(blob => {
        console.log(blob)
        saveAs(blob, "informe.docx")
        console.log("Document created successfully")
    })

}
