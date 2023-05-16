import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'; // npm install history
import Navbar from './';
import Home from '../pages/Home';
import Users from '../pages/Users';
import User from '../pages/User';

describe('Navbar', () => {
    const history = createMemoryHistory();

    test('navigates to Accueil page', () => {
        render(
            <MemoryRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MemoryRouter>
        )

        const accueilLink = screen.getByText('Accueil');
        accueilLink.click();

        // Vérification de l'url de la page Accueil
        expect(history.location.pathname).toBe('/');
        // Vérification du rendu de la page Accueil
        const accueilPageTitle = screen.getByText("Page d'accueil");
        expect(accueilPageTitle).toBeInTheDocument();
    });

    test('navigates to Users page', () => {
        render(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/users" element={<Users />} />
            </Routes>
        </Router>
        );

        const usersLink = screen.getByText('Users');
        usersLink.click();

        // Vérification de l'url de la page Users
        expect(window.location.pathname).toBe('/users');
    });

    test('navigates to Profile page', () => {
        render(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/profile" element={<User />} />
            </Routes>
        </Router>
        );

        const profileLink = screen.getByText('Profile');
        profileLink.click();

        // Vérification de l'url de la page User
        expect(window.location.pathname).toBe('/profile');
    });
});

/* 
    - Pour les tests d'URL utiliser <Router> avec l'historique.
    - Pour les tests plus complexes de navigation et de rendu de composants, 
    utiliser <MemoryRouter>
 //*/