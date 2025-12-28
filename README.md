# 🎭 DANCETOPIA

A modern, immersive web platform for discovering dance styles, events, and communities. Built with vanilla HTML, CSS, and JavaScript, featuring dynamic backgrounds, interactive cards, and a persistent music player.

![DANCETOPIA](https://img.shields.io/badge/Dance-Platform-ff4ecd?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Dance Form Pages
- **Hip Hop** - Urban street styles with graffiti-inspired aesthetics
- **Bharatanatyam** - Classical Indian dance with temple-inspired visuals
- **Salsa** - Latin rhythms with vibrant tropical colors
- **Contemporary** - Modern artistic expression with minimalist design

### 🎵 Global Music Player
- Floating widget with YouTube integration
- Persistent playback across all pages
- Play/pause, previous/next track controls
- Volume slider with visual feedback
- Remembers playback state via localStorage
- Customizable playlist in `scripts/music-tracks.js`

### 🎬 Interactive Elements
- **Expanding Cards** - Click any event/class/studio card to see full details
- **Tab Navigation** - Switch between Events, Learn, and Studios sections
- **Video Backgrounds** - Dynamic video layers that change per section
- **Hover Effects** - Magnetic card interactions and smooth transitions
- **Animated Logo** - Letter-by-letter bounce animation on hover

### 🎨 Visual Design
- **Dance-Specific Themes** - Each dance form has unique color schemes and animations
- **Dynamic Backgrounds** - Layered overlays with animated patterns
- **Glassmorphism** - Frosted glass effects on cards and panels
- **Responsive Layout** - Mobile-friendly design with adaptive breakpoints

## 📁 Project Structure

```
ProjectRia/
├── index.html                 # Landing page with dance style cards
├── styles/
│   └── main.css              # Global styles + dance-specific themes
├── scripts/
│   ├── main.js               # Landing page interactions
│   ├── music-tracks.js       # YouTube playlist configuration
│   ├── music-player.js       # Global music widget logic
│   ├── hiphop.js            # Hip Hop page interactions
│   ├── bharatanatyam.js     # Bharatanatyam page interactions
│   ├── salsa.js             # Salsa page interactions
│   └── contemporary.js       # Contemporary page interactions
├── dance-forms/
│   ├── hiphop.html          # Hip Hop dance page
│   ├── bharatanatyam.html   # Bharatanatyam dance page
│   ├── salsa.html           # Salsa dance page
│   └── contemporary.html     # Contemporary dance page
├── assets/
│   └── videos/              # Background video files (not included)
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required for YouTube API)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd ProjectRia
   ```

2. **Start a local web server**
   
   **Option A: Python**
   ```bash
   # Python 3
   python -m http.server 8080
   
   # Python 2
   python -m SimpleHTTPServer 8080
   ```
   
   **Option B: Node.js**
   ```bash
   npx http-server -p 8080
   ```
   
   **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### ⚠️ Important Notes

- **YouTube API Requirement**: The music player requires HTTP/HTTPS protocol. It will NOT work when opening files directly (file:// protocol).
- **Video Assets**: Background videos are not included. Add your own videos to `assets/videos/` or remove video elements.
- **Music Playlist**: Edit `scripts/music-tracks.js` to customize the YouTube playlist.

## 🎵 Customizing the Music Player

Edit `scripts/music-tracks.js` to add your own YouTube videos:

```javascript
const sampleTracks = [
    { title: 'Your Track Name', url: 'https://www.youtube.com/watch?v=VIDEO_ID' },
    { title: 'Another Track', url: 'https://www.youtube.com/watch?v=VIDEO_ID' },
    // Add more tracks...
];
```

The player will:
- Randomly shuffle through tracks
- Remember volume and playback position
- Continue playing as you navigate between pages
- Show track info in the floating widget

## 🎨 Styling & Themes

Each dance form has its own visual theme defined in `styles/main.css`:

- **Hip Hop**: Dark grays, neon accents, graffiti patterns
- **Bharatanatyam**: Rich browns, golden highlights, temple motifs
- **Salsa**: Vibrant reds, oranges, tropical gradients
- **Contemporary**: Cool blues, purples, minimalist patterns

### Customizing Themes

Search for these sections in `main.css`:
```css
/* --- HIP HOP ATMOSPHERE --- */
/* --- BHARATANATYAM ATMOSPHERE --- */
/* --- SALSA ATMOSPHERE --- */
/* --- CONTEMPORARY ATMOSPHERE --- */
```

Adjust colors, gradients, and animation properties to match your brand.

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- **Desktop**: > 768px (full layout)
- **Tablet**: 640px - 768px (adapted grid)
- **Mobile**: < 640px (stacked layout, tap-to-expand music widget)

## 🌐 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and root folder
4. Site will be live at `https://username.github.io/repo-name`

### Netlify
1. Connect your Git repository
2. Build command: (leave empty)
3. Publish directory: `/`
4. Deploy automatically on push

### Vercel
1. Import Git repository
2. Framework preset: Other
3. Deploy with one click

### Traditional Hosting
Upload all files to your web host via FTP/SFTP. Ensure the directory structure is preserved.

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup, video elements
- **CSS3** - Grid, Flexbox, animations, backdrop-filter
- **Vanilla JavaScript** - No frameworks or libraries
- **YouTube IFrame API** - Music playback integration
- **localStorage** - Persistent music player state

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Performance
- Lightweight: ~50KB total (excluding videos)
- No external dependencies
- Lazy-loaded scripts with `defer`
- Optimized CSS animations

## 🎯 Features Roadmap

- [ ] Audio-reactive visualizations (requires audio file hosting)
- [ ] Search and filter functionality
- [ ] User authentication and favorites
- [ ] Event calendar integration
- [ ] Social sharing features
- [ ] Dark/light mode toggle

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ for the dance community

## 🙏 Acknowledgments

- Dance community for inspiration
- YouTube for music integration
- Modern web standards for making this possible

---

**Note**: This is a demonstration project. Replace placeholder content with real dance events, classes, and studios for production use.

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Ensure you're using a web server (not file://)
3. Verify YouTube videos are not region-blocked
4. Clear browser cache if styles don't update

---

Made with passion for dance 💃🕺
