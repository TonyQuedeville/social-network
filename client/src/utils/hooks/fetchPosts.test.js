import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from "./useFetch.jsx";

test('test récupération des données de posts.json', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch("http://localhost:8080/posts.json"));
    
    await waitForNextUpdate();
    
    expect(result.current.error).toEqual(false);
    expect(result.current.data).toBeDefined(); // Vérifie que les données ne sont pas undefined
    expect(result.current.isLoading).toEqual(false);
});