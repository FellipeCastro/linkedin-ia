import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const analyzeRequestSchema = z.object({
    imageUrl: z.string().min(1, "URL da imagem é obrigatória"),
    fileName: z.string().optional(),
    fileType: z.string().optional(),
    fileSize: z.number().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = analyzeRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
                },
                { status: 400 },
            );
        }

        const { imageUrl, fileName, fileType, fileSize } = validation.data;

        const base64Data = imageUrl.split(",")[1];
        const mimeType = imageUrl.match(/data:([^;]+);/)?.[1] || "image/jpeg";
        const buffer = Buffer.from(base64Data, "base64");
        const blob = new Blob([buffer], { type: mimeType });

        const formData = new FormData();
        formData.append("data", blob, fileName);

        // const n8nWebhookUrl = "https://fellipecastro.app.n8n.cloud/webhook-test/99a755a2-4b11-40df-88f8-391906b6cf02";
        // const n8nResponse = await fetch(n8nWebhookUrl, {
        //     method: "POST",
        //     body: formData,
        // });

        // if (!n8nResponse.ok) {
        //     console.error("Erro ao enviar para n8n:", await n8nResponse.text());
        //     return NextResponse.json(
        //         {
        //             success: false,
        //             error: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
        //         },
        //         { status: 400 },
        //     );
        // }

        // const response = await n8nResponse.json();
        
        return NextResponse.json(
            {
                success: true,
                message: "Imagem processada com sucesso.",
                data: {
                    originalImage: "http://localhost:3000/_next/image?url=%2Ffoto-2.jpg&w=1920&q=75",
                    generatedImage: "http://localhost:3000/_next/image?url=%2Ffoto-2.jpg&w=1920&q=75",
                    fileName,
                    fileType,
                    fileSize,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Erro na API:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
            },
            { status: 500 },
        );
    }
}
