import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../Login';
import { Register } from '../Register';

function UnauthenticatedApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export { UnauthenticatedApp };