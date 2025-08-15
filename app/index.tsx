    import { useState, useMemo } from "react";
    import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
    import { Stack } from "expo-router";
    import { usePessoas } from "../ganchos/usePessoas";
    import CartaoPessoa from "../components/CartaoPessoa";
    import { cores } from "../temas/cores";

    export default function TelaInicial() {
    const { data, isLoading, isError, refetch, isFetching } = usePessoas();
    const [refreshing, setRefreshing] = useState(false);
    const [pagina, setPagina] = useState(1);
    const tamanhoPagina = 5;

    const totalPaginas = useMemo(() => {
        if (!data) return 1;
        return Math.max(1, Math.ceil(data.length / tamanhoPagina));
    }, [data]);

    const dadosPaginados = useMemo(() => {
        if (!data) return [];
        const inicio = (pagina - 1) * tamanhoPagina;
        return data.slice(inicio, inicio + tamanhoPagina);
    }, [data, pagina]);

    async function onRefresh() {
        setRefreshing(true);
        await refetch();
        setPagina(1);
        setRefreshing(false);
    }

    function atualizar() {
        refetch();
        setPagina(1);
    }

    function proxima() {
        if (pagina < totalPaginas) setPagina(pagina + 1);
    }

    function anterior() {
        if (pagina > 1) setPagina(pagina - 1);
    }

    return (
        <>
        <Stack.Screen
            options={{
            title: "Lista de Pessoas",
            headerStyle: { backgroundColor: cores.vinhoEscuro },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            }}
        />

        <View style={estilos.container}>
            <View style={estilos.topo}>
            <TouchableOpacity style={estilos.botao} onPress={atualizar} disabled={isFetching}>
                <Text style={estilos.botaoTexto}>{isFetching ? "Atualizando..." : "Atualizar"}</Text>
            </TouchableOpacity>
            <Text style={estilos.paginacao}>
                {pagina} / {totalPaginas}
            </Text>
            </View>

            {isLoading && (
            <View style={estilos.center}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={estilos.msg}>Carregando pessoas...</Text>
            </View>
            )}

            {isError && (
            <View style={estilos.center}>
                <Text style={estilos.msg}>Erro ao carregar pessoas</Text>
                <TouchableOpacity style={estilos.botao} onPress={atualizar}>
                <Text style={estilos.botaoTexto}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
            )}

            {data && (
            <>
                <FlatList
                data={dadosPaginados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CartaoPessoa
                    id={item.id}
                    nome={item.name}
                    email={item.email}
                    cidade={item.address.city}
                    />
                )}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#fff"
                    colors={["#fff"]}
                    />
                }
                ListEmptyComponent={<Text style={estilos.msg}>Sem dados</Text>}
                />

                <View style={estilos.rodape}>
                <TouchableOpacity style={[estilos.botao, pagina === 1 && estilos.botaoDesabilitado]} onPress={anterior} disabled={pagina === 1}>
                    <Text style={estilos.botaoTexto}>Anterior</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.botao, pagina === totalPaginas && estilos.botaoDesabilitado]} onPress={proxima} disabled={pagina === totalPaginas}>
                    <Text style={estilos.botaoTexto}>Próxima</Text>
                </TouchableOpacity>
                </View>
            </>
            )}
        </View>
        </>
    );
    }

    const estilos = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.cinzaEscuro, padding: 16 },
    topo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    botao: { backgroundColor: cores.vinhoEscuro, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
    botaoDesabilitado: { opacity: 0.5 },
    botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    paginacao: { color: cores.verdeClaro, fontWeight: "bold" },
    msg: { textAlign: "center", marginTop: 12, color: cores.verdeClaro, fontSize: 16 },
    center: { alignItems: "center", justifyContent: "center", marginTop: 30 },
    rodape: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    });
