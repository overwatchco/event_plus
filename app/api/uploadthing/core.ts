import { addEvidencia } from "@/actions/evidencias-actions"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { z } from "zod"

const f = createUploadthing()


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {

    // Takes a 5 2mb images
    evidencias: f({
        image: { maxFileSize: "2MB", maxFileCount: 5 },
    })
        .input(z.object({ requerimientoId: z.string() }))
        .middleware(async ({ input }) => {
            // This code runs on your server before upload
            const user = await getUserSessionServer()
            const requerimientoId = input.requerimientoId
            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized")

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id, requerimientoId }
        })
        .onUploadComplete(async ({ metadata, file }) => {

            // This code RUNS ON YOUR SERVER after upload
            const createEvidencia = await addEvidencia(file.url, metadata.requerimientoId, file.key)
            console.log("Upload complete for userId:", metadata.userId)

            console.log("Requerimiento:", metadata.requerimientoId)

            console.log("file url", file.url)

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: createEvidencia }
        }),

} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter