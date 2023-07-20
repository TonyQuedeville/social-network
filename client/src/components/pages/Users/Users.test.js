import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Users from './';
import User from '../User/User';
import { userlist } from '../../../datas/UserList.js'

// jest.mock pour simuler la réponse du server
jest.mock('../../../datas/UserList.js', () => ({
    userlist: [
        {
            pseudo: 'Toto',
            sexe: 'h',
            jobTitle: 'Devops',
            picture: '',
        },
        {
            pseudo: 'Titi',
            sexe: 'h',
            jobTitle: 'Developpeur frontend',
            picture: '',
        },
        {
            pseudo: 'Tata',
            sexe: 'f',
            jobTitle: 'Développeuse Fullstack',
            picture: '',
        },
    ],
}));

describe('Users', () => {
    test('redirection vers la page profil utilisateur', async () => {
        render(
            <MemoryRouter initialEntries={['/users']}>
                <Routes>
                    <Route path="/users" element={<Users users={userlist} />} />
                    <Route path="/profile/:userid" element={<User />} />
                </Routes>                
            </MemoryRouter>
        );

        for (const user of userlist) {
            const userLink = screen.getByTestId(`user-link-${user.pseudo}`);
            fireEvent.click(userLink);
            expect(window.location.pathname).toBe(`/profile/${user.pseudo}`);
        }
    });
});
