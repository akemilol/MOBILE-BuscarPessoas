    import { useLocalSearchParams, Stack } from "expo-router";
    import { View, Text, StyleSheet, ScrollView } from "react-native";
    import { cores } from "../../temas/cores";
    import { useQuery } from "@tanstack/react-query";
    import { Pessoa } from "../../tipos/Pessoa";
    import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

    export default function DetalhesPessoa() {
    const params = useLocalSearchParams<{ id?: string | string[] }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

    const { data, isLoading, isError } = useQuery<Pessoa>({
        queryKey: ["pessoa", id],
        enabled: Boolean(id),
        queryFn: async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Erro ao buscar pessoa");
        return res.json();
        },
    });

    return (
        <>
        <Stack.Screen
            options={{
            title: data ? data.name : "Detalhes",
            headerStyle: { backgroundColor: cores.vinhoEscuro },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            }}
        />

        <ScrollView style={estilos.container}>
            {isLoading && <Text style={estilos.texto}>Carregando...</Text>}
            {isError && <Text style={estilos.texto}>Erro ao carregar</Text>}
            {data && (
            <>
                <View style={estilos.topo}>
                <MaterialIcons name="account-circle" size={90} color={cores.vinhoEscuro} />
                <Text style={estilos.nome}>{data.name}</Text>
                </View>

                <View style={estilos.infoLinha}>
                <MaterialIcons name="person" size={24} color={cores.cinzaEscuro} />
                <Text style={estilos.label}>Usuário:</Text>
                <Text style={estilos.valor}>{data.username}</Text>
                </View>

                <View style={estilos.infoLinha}>
                <MaterialIcons name="email" size={24} color={cores.cinzaEscuro} />
                <Text style={estilos.label}>Email:</Text>
                <Text style={estilos.valor}>{data.email}</Text>
                </View>

                <View style={estilos.infoLinha}>
                <MaterialIcons name="phone" size={24} color={cores.cinzaEscuro} />
                <Text style={estilos.label}>Telefone:</Text>
                <Text style={estilos.valor}>{data.phone}</Text>
                </View>

                <View style={estilos.infoLinha}>
                <MaterialIcons name="language" size={24} color={cores.cinzaEscuro} />
                <Text style={estilos.label}>Website:</Text>
                <Text style={estilos.valor}>{data.website}</Text>
                </View>

                <View style={estilos.secao}>
                <Text style={estilos.secaoTitulo}>Endereço</Text>
                <View style={estilos.infoLinha}>
                    <MaterialIcons name="home" size={24} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>{data.address.street}, {data.address.suite}</Text>
                </View>
                <View style={estilos.infoLinha}>
                    <MaterialIcons name="location-city" size={24} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>{data.address.city} - {data.address.zipcode}</Text>
                </View>
                <View style={estilos.infoLinha}>
                    <FontAwesome5 name="map-marked-alt" size={20} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>Latitude: {data.address.geo.lat}, Longitude: {data.address.geo.lng}</Text>
                </View>
                </View>

                <View style={estilos.secao}>
                <Text style={estilos.secaoTitulo}>Empresa</Text>
                <View style={estilos.infoLinha}>
                    <MaterialIcons name="business" size={24} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>{data.company.name}</Text>
                </View>
                <View style={estilos.infoLinha}>
                    <MaterialIcons name="emoji-objects" size={24} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>{data.company.catchPhrase}</Text>
                </View>
                <View style={estilos.infoLinha}>
                    <MaterialIcons name="work" size={24} color={cores.cinzaEscuro} />
                    <Text style={estilos.valor}>{data.company.bs}</Text>
                </View>
                </View>
            </>
            )}
        </ScrollView>
        </>
    );
    }

    const estilos = StyleSheet.create({
    container: { flex: 1, backgroundColor: cores.verdeClaro, padding: 20 },
    topo: { alignItems: "center", marginBottom: 20 },
    nome: { fontWeight: "bold", fontSize: 22, color: cores.vinhoEscuro, marginTop: 10 },
    infoLinha: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    label: { fontWeight: "bold", fontSize: 16, color: cores.vinhoEscuro, marginLeft: 5, marginRight: 5 },
    valor: { fontSize: 16, color: cores.cinzaEscuro, flexShrink: 1 },
    texto: { fontSize: 16, color: cores.cinzaEscuro, textAlign: "center", marginTop: 20 },
    secao: { marginTop: 15, marginBottom: 10 },
    secaoTitulo: { fontWeight: "bold", fontSize: 18, color: cores.vinhoEscuro, marginBottom: 5 },
    });
