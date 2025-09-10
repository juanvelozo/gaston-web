import React from 'react';
import { cn } from '../../../libs/utils';

interface MockChartProps {
    type: 'send' | 'receive';
    className?: string;
}

const MockChart: React.FC<MockChartProps> = ({ type, className }) => {
    // Datos mock para el gráfico de líneas
    const sendData = [20, 35, 25, 40, 30, 45, 35];
    const receiveData = [15, 25, 35, 30, 40, 35, 50];

    const data = type === 'send' ? sendData : receiveData;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    // Convertir datos a puntos SVG
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - minValue) / (maxValue - minValue)) * 80; // 80% del alto
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className={cn('w-full h-16 relative', className)}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0"
            >
                {/* Grid de fondo sutil */}
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Área bajo la línea */}
                <polygon
                    points={`0,100 ${points} 100,100`}
                    fill="rgba(255, 255, 255, 0.15)"
                />

                {/* Línea del gráfico */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Puntos en la línea */}
                {data.map((value, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 100 - ((value - minValue) / (maxValue - minValue)) * 80;
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill="rgba(255, 255, 255, 0.9)"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default MockChart;
