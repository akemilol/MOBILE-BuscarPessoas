import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { cores } from "../temas/cores";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
    id: number;
    nome: string;
    email: string;
    cidade: string;
    }

    export default function CartaoPessoa({ id, nome, email, cidade }: Props) {
    return (
        <Link href={`/pessoa/${id}`} asChild>
        <TouchableOpacity style={estilos.cartao}>
            <MaterialIcons name="person" size={28} color={cores.vinhoEscuro} />
            <View style={estilos.info}>
            <Text style={estilos.nome}>{nome}</Text>
            <Text style={estilos.texto}>{email}</Text>
            <Text style={estilos.texto}>{cidade}</Text>
            </View>
        </TouchableOpacity>
        </Link>
    );
    }

    const estilos = StyleSheet.create({
    cartao: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: cores.verdePalido,
        padding: 16,
        borderRadius: 10,
        marginVertical: 8,
        elevation: 3,
    },
    info: {
        marginLeft: 10,
    },
    nome: {
        fontWeight: "bold",
        color: cores.vinhoEscuro,
        fontSize: 16,
    },
    texto: {
        color: cores.cinzaEscuro,
        fontSize: 14,
    },
});
