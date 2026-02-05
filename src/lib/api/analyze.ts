interface GeneratePhotoRequest {
    imageUrl: string;
    fileName?: string;
    fileType?: string;
    fileSize?: number;
}

interface GeneratePhotoResponse {
    success: boolean;
    message: string;
    data: {
        originalImage: string;
        generatedImage?: string;
        fileName?: string;
        fileType?: string;
        fileSize?: number;
        [key: string]: any;
    };
    error: string;
}

export async function generateProfessionalPhoto(
    request: GeneratePhotoRequest,
): Promise<GeneratePhotoResponse> {    
    const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Falha ao gerar a foto profissional.");
    }

    return response.json();
}
