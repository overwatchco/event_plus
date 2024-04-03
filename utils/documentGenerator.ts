import { Document, HeadingLevel, ImageRun, Packer, Paragraph, SectionType, Table, TextRun } from "docx"
import { saveAs } from "file-saver"
import { TableCreator } from "./createTable"
import { getImages } from "@/actions/image-actions";
import { fullEvento } from "@/actions/evento-actions";


async function getFromUrl(url: string) {
    const blob = await fetch(url).then((r) => r.blob());
    return blob
}


export async function generateFile(evento: fullEvento | null) {

    const tablaRequerimientos = new TableCreator()


    //NOTE: PORTADA DEL DOCUMENTO
    const titulo = new Paragraph({
        text: evento?.nombre,
        heading: "Title",
        alignment: "center",
    })


    const numeroContrato = new Paragraph({
        run: {
            size: 20,
            bold: true,
        },
        text: evento?.contratoId,
        alignment: "center",
    })


    const descripcionEvento = new Paragraph({
        run: {
            size: 20,
        },
        text: evento?.descripcion,
        alignment: "distribute",
    })


    //NOTE: ITEMS DEL DOCUMENTO
    //ALMACENA CADA UNO DE LOS ITEMS 

    let items = []

    if (evento?.Items) {


        let item = evento.Items

        for (let index = 0; index < item.length; index++) {


            //IMAGENES DE EVIDENCIA
            const dbImagenesEvidencias = await Promise.all(
                item[index].Requerimiento.map(async (requerimiento) => {
                    const images = await getImages(requerimiento.id)
                    return images
                })
            )



            //OBTIENE CADA UNA DE LAS IMAGENES DE EVIDENCIA
            let imageRuns = []

            for (let i = 0; i < dbImagenesEvidencias.length; i++) {
                for (let j = 0; j < dbImagenesEvidencias[i].length; j++) {
                    let imageRun = new ImageRun({
                        type: 'jpg',

                        //TODO: REVISAR POR QUE BLOB NO ES VALIDO SI ASI VIENE EN LA DOCUMENTACION
                        data: await getFromUrl(dbImagenesEvidencias[i][j]),
                        transformation: {
                            width: 100,
                            height: 100,
                        },
                    });
                    imageRuns.push(imageRun)
                }
            }




            items.push(
                new Paragraph({
                    text: `Item ${index + 1}. ` + item[index].servicio,
                    heading: "Heading1",
                    alignment: "left"
                }),


                new Paragraph({
                    run: {
                        size: 20,
                    },
                    text: `DESCRIPCION: ${item[index].descripcion}`,
                    alignment: "left"
                }),


                //NOTE: CREA UNA TABLA CON LOS REQUERIMIENTOS
                tablaRequerimientos.CreateTable(item[index].Requerimiento),

                //REGISTRO FOTOGRAFICO EVIDENCIA DEL EVENTO

                new Paragraph({
                    text: 'REGISTRO FOTOGRÁFICO',
                    heading: "Heading1",
                    alignment: "left",
                }),

                new Paragraph({
                    children: imageRuns
                })

            )

        }

    }



    const doc = new Document({


        //NOTE: CONFIGURACION DEL DOCUMENTO
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

        //PAGINAS O SECCIONES DEL DOCUMENTO EN GENERAL
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
        ],

    })


    //GENERA EL DOCUMENTO EN UN ARCHIVO DOC 
    Packer.toBlob(doc).then(blob => {
        console.log(blob)
        saveAs(blob, "informe.docx")
        console.log("Document created successfully")
    })

}
