import {http} from "@/http/api";

export default {
    verificarCPF: async (cpf: string, online: boolean = navigator.onLine): Promise<IVerificacaoCPF> => {
        if (online) {
            try {
                await http.options('/verificar-cpf');  // Mantido do padrão antigo (se necessário para CORS/preflight)
                const response = await http.post('/verificar-cpf', {cpf});
                const data = response.data as IVerificacaoCPF;
                localStorage.setItem('verificacaoCPF', JSON.stringify(data));  // Cache para offline
                if (data.token) localStorage.setItem('token', data.token);  // Salva token se retornado
                return data;
            } catch (error) {
                console.error("ERRO endpoint: VERIFICAR_CPF", error);
                return {valido: false, mensagem: 'Erro ao verificar CPF.'};
            }
        } else {
            const stored = localStorage.getItem('verificacaoCPF');
            if (stored) {
                return JSON.parse(stored) as IVerificacaoCPF;
            } else {
                return {valido: false, mensagem: 'Sem conexão. Verificação offline não disponível.'};
            }
        }
    },

    listChapas: async (assembleiaId: number, online: boolean = navigator.onLine): Promise<IChapa[]> => {
        if (online) {
            try {
                await http.options('/list-chapas'); // Preflight
                const response = await http.post('/list-chapas', {assembleiaId});
                const data = response.data as IChapa[];
                localStorage.setItem('listChapas', JSON.stringify(data));  // Cache
                return data;
            } catch (error) {
                console.error("ERRO endpoint: LIST_CHAPAS", error);
                return [];
            }
        } else {
            const storedList = localStorage.getItem('listChapas');
            if (storedList) {
                return JSON.parse(storedList) as IChapa[];
            } else {
                return [];
            }
        }
    },

    votar: async (cpf: string, chapaId: number, online: boolean = navigator.onLine): Promise<IVotoResponse> => {
        if (online) {
            try {
                await http.options('/votar');
                const response = await http.post('/votar', {cpf, chapaId});
                const data = response.data as IVotoResponse;
                return data;
            } catch (error) {
                console.error("ERRO endpoint: VOTAR", error);
                localStorage.setItem('votoPendente', JSON.stringify({cpf, chapaId}));
                return {sucesso: false, mensagem: 'Voto pendente (sem conexão). Será enviado ao reconectar.'};
            }
        } else {
            // Cache para sync posterior
            localStorage.setItem('votoPendente', JSON.stringify({cpf, chapaId}));
            return {sucesso: false, mensagem: 'Sem conexão. Voto salvo localmente para envio posterior.'};
        }
    },

    syncVotosPendentes: async () => {
        const pendente = localStorage.getItem('votoPendente');
        if (pendente && navigator.onLine) {
            const {cpf, chapaId} = JSON.parse(pendente);
            const response = await this.votar(cpf, chapaId, true);
            if (response.sucesso) localStorage.removeItem('votoPendente');
        }
    },
};