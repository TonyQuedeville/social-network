import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import User from './';

describe('User', () => {
    test('rendu de la page profil utilisateur', async () => {
        const user = {
            pseudo: 'Anonyme',
            sexe: 'h',
            jobTitle: 'aucun',
            picture: '',
        };

        render(
            <MemoryRouter initialEntries={[`/profile`]}>
                <Routes>
                    <Route path="/profile" element={<User {...user} />} />
                </Routes>
            </MemoryRouter>
        );
        /*render(
            <MemoryRouter initialEntries={[`/profile/${user.pseudo}`]}>
                <Routes>
                    <Route path="/profile/:username" element={<User />} />
                </Routes>    
            </MemoryRouter>
        );
        //*/

        // Vérification du composant loader (temps de chargement)
        expect(screen.getByTestId('loader')).toBeTruthy()

        // Vérification du rendu de la page Profile
        /*await waitFor(() => {  
            const userPseudo = screen.getByTestId(`user-pseudo-${user.pseudo}`);
            expect(userPseudo).toBeInTheDocument();
            const userTitle = screen.getByTestId(`user-title-${user.jobTitle}`);
            expect(userTitle).toBeInTheDocument();
            const userPhoto = screen.getByTestId(`user-photo-${user.picture}`);
            expect(userPhoto).toBeInTheDocument();
        })
        //*/
    });
});
