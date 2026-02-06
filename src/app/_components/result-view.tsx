"use client";

import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ResultViewProps {
    selectedPhoto: string;
    generatedPhoto: string;
    onStartOver: () => void;
}

export function ResultView({
    selectedPhoto,
    generatedPhoto,
    onStartOver,
}: ResultViewProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(generatedPhoto);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "foto-profissional.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erro ao baixar a imagem:", error);
        }
    };

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-3">
                        Sua Foto Profissional Está Pronta!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Confira o resultado abaixo e faça o download da sua nova
                        foto profissional.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-3">
                            Foto Original
                        </p>
                        <div className="relative w-full aspect-3/4 max-w-sm rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={selectedPhoto}
                                alt="Foto Original"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-3">
                            Foto Depois
                        </p>
                        <div className="relative w-full aspect-3/4 max-w-sm rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={generatedPhoto}
                                alt="Foto Depois"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                        onClick={handleDownload}
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white px-6 cursor-pointer"
                    >
                        <Download className="h-5 w-5 mr-2" />
                        Baixar Foto
                    </Button>

                    <Button 
                        onClick={onStartOver}
                        size="lg"
                        variant="outline"
                        className="px-6 cursor-pointer"
                    >
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Gerar Outra Foto
                    </Button>
                </div>
            </div>
        </main>
    );
}
