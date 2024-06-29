import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/site/Blogs";
import Header from "./components/header/Header";
import Emergencia from "./pages/site/Emergencia";
import NossaEquipe from "./pages/site/NossaEquipe";
import Login from "./pages/site/Login";
import Cadastro from "./pages/site/Cadastro";

import { useAuthCtx } from "./context/AuthContext";
import Error404 from "./pages/Error404";
import ClienteConsulta from "./pages/cliente/ClienteConsulta";
import NovaConsulta from "./pages/cliente/NovaConsulta";

const PrivateCliente = ({Item}) => {
    const { signed } = useAuthCtx();
    const { permissao } = useAuthCtx();
    return (signed > 0 && permissao === 3) ? <Item /> : <Error404/>
}

const PrivateFuncionario = ({Item}) => {
    const { signed } = useAuthCtx();
    const { permissao } = useAuthCtx();
    return (signed > 0 && permissao === 2) ? <Item /> : <Error404/>
}

const PrivateAdmin = ({Item}) => {
    const { permissao } = useAuthCtx();
    const { signed } = useAuthCtx();
    return (signed > 0 && permissao === 1) ? <Item /> : <Error404/>
}

const MyRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<Blogs/>} path="/"></Route>
                    <Route element={<NossaEquipe/>} path="/nossaEquipe"></Route>
                    <Route element={<Emergencia/>} path="/emergencia"></Route>
                    <Route element={<Login/>} path="/login"></Route>
                    <Route element={<Cadastro/>} path="/cadastro"></Route>

                    <Route element={<PrivateCliente Item={ClienteConsulta} />} path="/cliente/consulta"></Route>
                    <Route element={<PrivateCliente Item={NovaConsulta} />} path="/cliente/consulta/nova"></Route>

                    <Route element={<Error404/>} path="*"></Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default MyRoutes;