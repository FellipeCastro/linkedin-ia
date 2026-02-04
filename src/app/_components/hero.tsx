"use client";

import Image from "next/image";

export function Hero() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Transforme suas fotos com IA
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                    Crie imagens incríveis com inteligência artificial. Basta
                    enviar sua foto e deixar a magia acontecer!
                </p>
            </div>

            <div className="flex justify-center items-center lg:justify-start gap-4">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-200 -rotate-2">
                    <Image
                        src="/foto-1.jpg"
                        alt="Exemplo de uma foto profissional"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative w-42 h-52 rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                        src="/foto-2.jpg"
                        alt="Exemplo de uma foto profissional"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-200 rotate-2">
                    <Image
                        src="/foto-3.jpg"
                        alt="Exemplo de uma foto profissional"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
