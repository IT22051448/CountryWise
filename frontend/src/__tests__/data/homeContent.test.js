import { facts, slides } from '@/data/homeContent';

describe('homeContent data', () => {
  describe('facts array', () => {
    it('should contain exactly 12 facts', () => {
      expect(facts).toHaveLength(12);
    });

    it('each fact should have an id (number), fact (non-empty string), and image (URL string)', () => {
      facts.forEach((f) => {
        expect(f).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            fact: expect.any(String),
            image: expect.any(String),
          })
        );
        expect(f.fact.length).toBeGreaterThan(0);

        expect(f.image).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('slides array', () => {
    it('should contain exactly 5 slides', () => {
      expect(slides).toHaveLength(5);
    });

    it('each slide should have an id (number), heading (non-empty string), text (non-empty string), and image (URL string)', () => {
      slides.forEach((s) => {
        expect(s).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            heading: expect.any(String),
            text: expect.any(String),
            image: expect.any(String),
          })
        );
        expect(s.heading.length).toBeGreaterThan(0);
        expect(s.text.length).toBeGreaterThan(0);
        expect(s.image).toMatch(/^https?:\/\//);
      });
    });
  });
});
