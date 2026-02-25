# GoeODM

GoeODM (Göttingen Open Digital Museum ) is a project dedicated to capturing and maintaining 3D models of monuments and public art in the city spaces of Göttingen using photogrammetry.

## Project Goals
The primary aim of this project is to document and preserve 3D models of Göttingen's cultural and artistic heritage. By leveraging modern photogrammetry techniques, we hope to make high-quality 3D models of monuments and public art widely accessible.

## Explore & Download the Models
All 3D models are available at our external storage and on the website. You can browse and interact with them directly:

- **Browse models**: Visit [openmuseum.io](https://openmuseum.io)
- Models are available in multiple formats for different platforms and applications

## Asset Storage
Large files (3D models and images) are hosted on external storage to keep the repository lightweight.

The storage URL is configured via the `PUBLIC_ASSETS_BASE_URL` environment variable:

```bash
# Copy the example env file
cp .env.example .env

# Set the storage URL (current: Firebase Storage)
PUBLIC_ASSETS_BASE_URL=https://open-museum-885a1.firebasestorage.app
```

### Local Development
- **With remote assets**: Set `PUBLIC_ASSETS_BASE_URL` in `.env` and assets load from Firebase
- **With local assets**: Leave `PUBLIC_ASSETS_BASE_URL` empty and place asset files in `public/models/` and `public/images/works/` (these directories are gitignored)
- **Switching providers**: Just change the URL — file paths are resolved at build time via [`src/utils/assets.ts`](src/utils/assets.ts)

## How to Contribute
Feel free to contribute to this project in any way you can. Whether it's capturing new models, improving existing ones, or sharing feedback, your help is greatly appreciated!

If you have any questions or suggestions, don’t hesitate to contact me.

## Support Us
Your support means a lot! Here’s how you can help:
- Make a donation.
- Star this repository ⭐
- Make a donation.
- Share the project with others
- Make a donation.

## License

### Code (website / software)
All source code (Astro/TypeScript/CSS/JavaScript) in this repository is licensed under the MIT License. See `LICENSE`.

### 3D models and media
All 3D models, scans, textures, and other non-code assets in this repository (for example in `models/` and/or `assets/`) are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.


Thank you for your interest in GoeODM!