import React from 'react';
import { modalManager } from '../../animated/Modal/Modal.component';
import { useAuth } from '../../../modules/auth/hooks/useAuth.hook';
import { Copy, QrCode } from 'iconoir-react';
import { toast } from 'sonner';
import { Button } from '../../animated/button/Button.component';
import { Text, Title } from '../Typography/Typography.component';

export const openReceiveModal = () => {
    console.log('Opening receive modal...');
    const modalId = modalManager.open({
        title: 'Recibir Pagos',
        description: 'Comparte tu información para recibir pagos',
        bgColor: 'white',
        className: 'max-w-md',
        content: <ReceiveModalContent />,
        backdropClose: true,
    });
    console.log('Modal opened with ID:', modalId);
    return modalId;
};

const ReceiveModalContent: React.FC = () => {
    const { principal } = useAuth();

    const handleCopyPrincipal = () => {
        if (principal) {
            navigator.clipboard.writeText(principal.toString()).then(() => {
                toast.success('¡Copiado!', {
                    description: 'Tu principal ya está disponible en tu portapapeles.',
                });
            });
        }
    };

    const handleCopyWalletId = () => {
        // Mock wallet ID - en una app real vendría de la API
        const walletId = 'wallet_' + Math.random().toString(36).substr(2, 9);
        navigator.clipboard.writeText(walletId).then(() => {
            toast.success('¡Copiado!', {
                description: 'ID de billetera copiado al portapapeles.',
            });
        });
    };

    return (
        <div className="space-y-6 text-left">
            {/* Principal ID */}
            <div className="space-y-3">
                <Title className="text-lg text-brand-black font-sora">Tu Principal ID</Title>
                <div className="bg-brand-white/50 rounded-lg p-4 border border-brand-black/10">
                    <div className="flex items-center justify-between">
                        <Text className="text-sm font-space-mono text-brand-black/70 break-all">
                            {principal || 'Cargando...'}
                        </Text>
                        <Button
                            iconRight={<Copy color="#000" width={16} height={16} />}
                            onClick={handleCopyPrincipal}
                            variant="terciary"
                            className="ml-2 flex-shrink-0"
                        >
                            Copiar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Wallet ID */}
            <div className="space-y-3">
                <Title className="text-lg text-brand-black font-sora">ID de Billetera</Title>
                <div className="bg-brand-white/50 rounded-lg p-4 border border-brand-black/10">
                    <div className="flex items-center justify-between">
                        <Text className="text-sm font-space-mono text-brand-black/70">
                            wallet_abc123def
                        </Text>
                        <Button
                            iconRight={<Copy color="#000" width={16} height={16} />}
                            onClick={handleCopyWalletId}
                            variant="terciary"
                            className="ml-2 flex-shrink-0"
                        >
                            Copiar
                        </Button>
                    </div>
                </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="space-y-3">
                <Title className="text-lg text-brand-black font-sora">Código QR</Title>
                <div className="bg-brand-white/50 rounded-lg p-6 border border-brand-black/10 flex items-center justify-center">
                    <div className="text-center">
                        <QrCode color="#000" width={64} height={64} />
                        <Text className="text-sm text-brand-black/70 mt-2">
                            Escanea para recibir pagos
                        </Text>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-brand-green/10 rounded-lg p-4 border border-brand-green/20">
                <Text className="text-sm text-brand-black/70 font-work-sans">
                    💡 <strong>Consejo:</strong> Comparte tu Principal ID o escanea el código QR para recibir pagos de forma rápida y segura.
                </Text>
            </div>
        </div>
    );
};
