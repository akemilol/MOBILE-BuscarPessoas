import { useQuery } from "@tanstack/react-query";
import { Pessoa } from "../tipos/Pessoa";

async function buscarPessoas(): Promise<Pessoa[]> {
    const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!resposta.ok) throw new Error("Erro ao buscar pessoas");
    return resposta.json();
    }

    export function usePessoas() {
    return useQuery<Pessoa[]>({
        queryKey: ["pessoas"],
        queryFn: buscarPessoas,
    });
}
