"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UploadPhotoProps {
    onPhotoSelected: (photo: string) => void;
    onContinue: (url: string) => void;
    selectedPhoto: string | null;
}

export function UploadPhoto({
    onPhotoSelected,
    onContinue,
    selectedPhoto,
}: UploadPhotoProps) {
    const [isDraggin, setIsDraggin] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [fileSize, setFileSize] = useState<number>(0);
    const [fileType, setFileType] = useState<string>("");

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];

        if (file && file.type.startsWith("image/")) {
            setFileName(file.name);
            setFileSize(file.size);
            setFileType(file.type);

            const reader = new FileReader();
            reader.onload = (event) => {
                onPhotoSelected(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggin(true);
    };
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggin(false);
    };

    const handleGeneratePhoto = () => {
        console.log("Gerar foto profissional!");
    };

    const handleRemoveFile = () => {
        setFileName("");
        setFileSize(0);
        setFileType("");
        onPhotoSelected("");
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith("image/")) {
            setFileName(file.name);
            setFileSize(file.size);
            setFileType(file.type);

            const reader = new FileReader();
            reader.onload = (event) => {
                onPhotoSelected(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-4xl font-bold text-gray-900">
                    Envie sua foto
                </h2>
                <p className="text-sm text-gray-600">
                    Carregue uma foto sua para transformá-la em uma imagem
                    profissional usando IA.
                    <br />
                    Aceitamos arquivos JPG, PNG e WEBP até 5MB.
                </p>
            </div>

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200 cursor-pointer ${selectedPhoto ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
            >
                {!selectedPhoto ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                            <Upload className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">
                                Arraste e solte sua foto ou clique para carregar
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG ou WEBP
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-48 h-48 rounded-xl overflow-hidden">
                            {selectedPhoto && (
                                <Image
                                    src={selectedPhoto}
                                    alt="Preview da foto"
                                    fill
                                    className="object-cover w-full h-full z-0"
                                />
                            )}
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile();
                            }}
                            className="absolute z-20 top-4 right-4 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer p-1"
                        >
                            <X className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileSelect}
                    className="bg-red-50 w-full h-full absolute inset-0 cursor-pointer opacity-0 z-0"
                />
            </div>

            {selectedPhoto && (
                <Button
                    onClick={handleGeneratePhoto}
                    className="w-full h-12 text-base font-semibold cursor-pointer"
                    size="lg"
                >
                    Gerar foto profissional
                </Button>
            )}
        </div>
    );
}
