import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.numbers-game.website/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.numbers-game.website/game',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.9,
        },
    ]
}