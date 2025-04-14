import { useState } from 'react';

const PixPayment = () => {
    const [qrCode, setQrCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://example.com.br/api/v1/transaction.purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '<3bc4baf9-1b17-42ae-9b4b-82a3151ab35e>', // Substitua <secretKey> pela chave secreta real
                },
                body: JSON.stringify({
                    name: 'Nome do Cliente',
                    email: 'email@cliente.com',
                    cpf: '01234567890',
                    phone: '16999999999',
                    paymentMethod: 'PIX',
                    amount: 10000, // Valor em centavos
                    traceable: true,
                    items: [
                        {
                            unitPrice: 10000,
                            title: 'Produto Exemplo',
                            quantity: 1,
                            tangible: false,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao processar o pagamento');
            }

            const data = await response.json();
            setQrCode(data.pixQrCode); // Supondo que o QR Code esteja neste campo
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro desconhecido');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Pagamento via PIX</h2>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processando...' : 'Pagar com PIX'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {qrCode && (
                <div>
                    <h3>QR Code:</h3>
                    <img src={qrCode} alt="QR Code do PIX" />
                </div>
            )}
        </div>
    );
};

export default PixPayment;