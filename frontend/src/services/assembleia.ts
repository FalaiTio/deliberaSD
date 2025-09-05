import {http} from "@/http/api";

export default {
    listBoys: (online: boolean) => {
        if (online) {
            return http.get('/list-boy')
                .then(function (response) {
                    const data = response.data as IMotoboy[];
                    localStorage.setItem('listBoys', JSON.stringify(data));
                    return data;
                })
                .catch(function (error) {
                    console.log("ERRO endpoint: LISTBOYS", error);
                })
        } else {
            const storedList = localStorage.getItem('listBoys');
            if (storedList) {
                return Promise.resolve(JSON.parse(storedList) as IMotoboy[]);
            } else {
                return Promise.resolve([]);
            }
        }
    },
    listEntregasBoy: (idBoy: number, online: boolean, data: string) => {
        if (online) {
            return http.options('/list-entregas-boy')
                .then(() => {
                    return http.post('/list-entregas-boy', {id_fun: idBoy, data_age: data})
                        .then(function (response) {
                            const data = response.data as IEntrega[];
                            localStorage.setItem('listEntregas', JSON.stringify(data));
                            return data;
                        })
                        .catch(function (error) {
                            console.log("ERRO endpoint: LISTENTREGASBOY", error);
                        })
                });
        } else {
            const storedList = localStorage.getItem('listEntregas');
            if (storedList) {
                return Promise.resolve(JSON.parse(storedList) as IEntrega[]);
            } else {
                return Promise.resolve([]);
            }
        }
    },
    salvarAssinatura: (idAge: number, assinatura: string) => {
        let online = window.navigator.onLine;

        if (online) {
            let assinaturaObj: IAssinatura = {
                id_age: idAge ?? null,
                assinatura_age: assinatura ?? null
            };
            return http.post('/salvar-assinatura', assinaturaObj)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log("ERRO endpoint: SALVARASSINATURA", error);
                })
        } else {
            const dadosOffline = {
                id_age: idAge,
                assinatura_age: assinatura
            };

            let listAssinaturas: IAssinatura[] = [];
            const dadosOfflineString = localStorage.getItem('SaveSignOffline');
            if (dadosOfflineString) {
                listAssinaturas = JSON.parse(dadosOfflineString) as IAssinatura[];
            }

            if (!listAssinaturas.some(itemLista => itemLista.id_age === dadosOffline.id_age)) {
                listAssinaturas.push(dadosOffline);
            }

            const dadosOfflineEntregas = localStorage.getItem('listEntregas');
            if (dadosOfflineEntregas) {
                const listaAtualizada = JSON.parse(dadosOfflineEntregas) as Array<any>;

                // Remove o item da lista
                const index = listaAtualizada.findIndex(item => item.id_age == dadosOffline.id_age);
                if (index !== -1) {
                    listaAtualizada.splice(index, 1);
                }

                // Armazena a lista atualizada de volta no localStorage
                localStorage.setItem('listEntregas', JSON.stringify(listaAtualizada));
            }

            localStorage.setItem('SaveSignOffline', JSON.stringify(listAssinaturas));
        }
    },
    saveSignOffline: function () {
        let online = window.navigator.onLine;
        if (online) {
            const dadosOfflineString = localStorage.getItem('SaveSignOffline');

            if (dadosOfflineString) {
                const listaAssinaturas = JSON.parse(dadosOfflineString) as IAssinatura[];

                for (const item of listaAssinaturas) {
                    if (item) {
                        const {id_age, assinatura_age} = item;
                        this.salvarAssinatura(id_age, assinatura_age);
                    }
                }

                localStorage.removeItem('SaveSignOffline');
            }
        }
    },
    salvarFalhaEntrega: (idAge: number, motivo: string) => {
        let online = window.navigator.onLine;

        if (online) {
            let falhaObj: IFalhaEntrega = {
                id_age: idAge ?? null,
                motivo_cancel_age: motivo ?? null,
                status_age: 'Falha na Entrega'
            };
            return http.post('/falha-entrega', falhaObj)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log("ERRO endpoint: SALVARFALHAENTREGA", error);
                })
        } else {
            const dadosOffline = {
                id_age: idAge,
                motivo_cancel_age: motivo,
                status_age: 'Falha na entrrega'
            };

            let listFalhas: IFalhaEntrega[] = [];
            const dadosOfflineString = localStorage.getItem('SaveFailOffline');
            if (dadosOfflineString) {
                listFalhas = JSON.parse(dadosOfflineString) as IFalhaEntrega[];
            }

            if (!listFalhas.some(itemLista => itemLista.id_age === dadosOffline.id_age)) {
                listFalhas.push(dadosOffline);
            }

            const dadosOfflineEntregas = localStorage.getItem('listEntregas');
            if (dadosOfflineEntregas) {
                const listaAtualizada = JSON.parse(dadosOfflineEntregas) as Array<any>;

                // Remove o item da lista (similar ao salvarAssinatura)
                const index = listaAtualizada.findIndex(item => item.id_age == dadosOffline.id_age);
                if (index !== -1) {
                    listaAtualizada.splice(index, 1);
                }

                // Armazena a lista atualizada de volta no localStorage
                localStorage.setItem('listEntregas', JSON.stringify(listaAtualizada));
            }

            localStorage.setItem('SaveFailOffline', JSON.stringify(listFalhas));
        }
    },
    saveFailOffline: function () {
        let online = window.navigator.onLine;
        if (online) {
            const dadosOfflineString = localStorage.getItem('SaveFailOffline');

            if (dadosOfflineString) {
                const listaFalhas = JSON.parse(dadosOfflineString) as IFalhaEntrega[];

                for (const item of listaFalhas) {
                    if (item) {
                        const {id_age, motivo_cancel_age, status_age} = item;
                        this.salvarFalhaEntrega(id_age, motivo_cancel_age);
                    }
                }

                localStorage.removeItem('SaveFailOffline');
            }
        }
    }
}