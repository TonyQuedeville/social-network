/* Tuto sur les tests : 
https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7256829-testez-vos-composants-avec-react-testing-library
//*/

import Footer from './'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Footer', () => {
    // test le rendu du composant
    test('Should render without crashing', async () => {
        render(
            <ThemeProvider>
                <Footer />
            </ThemeProvider>
        )
    })

    // test la présence de "☀️"
    test('Présence du bouton', async () => {
        render(
            <ThemeProvider>
                <Footer />
            </ThemeProvider>
        )
        const nightModeButton = screen.getByRole('button') // peut être remplacer par : screen.getByTestId('id-button')
        expect(nightModeButton.textContent).toBe('Théme : ☀️')
        fireEvent.click(nightModeButton) // test l'action de clique sur le bouton. "fireEvent" simule l'evenement
        expect(nightModeButton.textContent).toBe('Théme : 🌙')
    })

})