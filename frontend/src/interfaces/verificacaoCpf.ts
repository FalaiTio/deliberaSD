interface IVerificacaoCPF {
    valido: boolean;
    mensagem: string;
    token?: string;  // Opcional: se backend retornar token para auth futura
}