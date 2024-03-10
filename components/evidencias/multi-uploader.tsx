'use client'

import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";

interface Props {
    requerimientoId: string
}

export function MultiUploader({ requerimientoId }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "evidencias",
        {
            onClientUploadComplete: () => {
                alert("uploaded successfully!");
            },
            onUploadError: () => {
                alert("error occurred while uploading");
            },
            onUploadBegin: () => {
                alert("upload has begun");
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div className="text-center mt-4">
            <div {...getRootProps()} className="border-2 border-dashed rounded p-4 cursor-pointer">
                <input {...getInputProps()} />
                <p className="text-gray-600 text-lg">Subir evidencias del requerimiento</p>
            </div>
            {files.length > 0 && (
                <Button className="mt-2 bg-green-500 text-white p-2 rounded cursor-pointer" onClick={() => startUpload(files, { requerimientoId })}>
                    Subir {files.length} Imagenes
                </Button>
            )}
        </div>
    );
}