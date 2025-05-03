import {
  restCountriesApi,
  useGetAllCountriesQuery,
  useGetCountriesByNameQuery,
  useGetCountriesByRegionQuery,
  useGetCountriesByLanguageQuery,
  useLazyGetCountriesByNameQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesByLanguageQuery,
} from '@/api/restCountriesApi';

describe('restCountriesApi hooks are exported', () => {
  it('useGetAllCountriesQuery is a function', () => {
    expect(typeof useGetAllCountriesQuery).toBe('function');
  });

  it('useGetCountriesByNameQuery is a function', () => {
    expect(typeof useGetCountriesByNameQuery).toBe('function');
  });

  it('useGetCountriesByRegionQuery is a function', () => {
    expect(typeof useGetCountriesByRegionQuery).toBe('function');
  });

  it('useGetCountriesByLanguageQuery is a function', () => {
    expect(typeof useGetCountriesByLanguageQuery).toBe('function');
  });

  it('useLazyGetCountriesByNameQuery is a function', () => {
    expect(typeof useLazyGetCountriesByNameQuery).toBe('function');
  });

  it('useLazyGetCountriesByRegionQuery is a function', () => {
    expect(typeof useLazyGetCountriesByRegionQuery).toBe('function');
  });

  it('useLazyGetCountriesByLanguageQuery is a function', () => {
    expect(typeof useLazyGetCountriesByLanguageQuery).toBe('function');
  });
});
