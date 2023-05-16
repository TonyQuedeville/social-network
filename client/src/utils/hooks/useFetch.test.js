/* Tuto sur les tests : 
https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7256627-decouvrez-la-base-des-tests-dans-react-avec-jest
https://openclassrooms.com/fr/courses/7150606-creez-une-application-react-complete/7256829-testez-vos-composants-avec-react-testing-library
//*/

import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from "./";

/* test() prend une string en premier argument et une fonction en deuxième argument. */
test('test erreur useFetch() avec une mauvaise url', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch("http://user"));
    
    await waitForNextUpdate();
    
    // toEqual est ce qu'on appelle un matcher. le matcher prend en parametre la reponse correcte que l'on attend du test.
    // expect() compare un élément avec le matcher
    expect(result.current.error).toEqual(true);
    expect(result.current.data).toEqual({});
    expect(result.current.isLoading).toEqual(false);
});

// Lancer le test : yarn run test

// describe() permet de lier plusieurs tests.  
/*describe('Fonction à tester', () => {
    test('1er test', () => {
        const expectedState = 'titi' // resultat attendu
        expect(nomfonction('toto')).toEqual(expectedState)
    })
    test('2eme test', () => {
        const expectedState = 'tata'
        expect(nomfonction('toto')).toEqual(expectedState)
    })
})
//*/