# Ahmed Ali - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features smooth animations and professional styling.

## ✨ Features

- **Responsive Design**
- **Modern UI/UX**
- **Smooth Animations**
- **Mobile-First**
- **SEO Optimized**
- **Fast Loading**
- **Accessibility**

## 🚀 Sections

1. **Home** - Landing page with profile picture and quick links
2. **About Me** - Personal introduction and career goals
3. **Skills** - Technical and soft skills
4. **Projects** - Portfolio of work with images
5. **Experience** - Work history timeline
6. **Education** - Academic background and courses
7. **Certificates** - Professional certifications
8. **Contact** - Contact form and information

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Roboto)

## 📁 File Structure

```
protofolio2/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── s.jpg              # Profile picture
├── A11.jpeg           # Project image 1
├── A2.jpeg            # Project image 2
├── A3.jpeg            # Project image 3
├── Ahmed_Ali.pdf      # CV/Resume
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Customize the content as needed

### Local Development
1. Use a local server (e.g., Live Server in VS Code)
2. Open `http://localhost:3000` in your browser
3. Make changes and see them in real-time

## 🎨 Customization

### Personal Information
Edit the following sections in `index.html`:

```html
<!-- Update your name -->
<h1>Ahmed Ali</h1>
<h2>Data Analyst | Python & SQL Enthusiast</h2>

<!-- Update profile picture -->
<img src="s.jpg" alt="Ahmed Ali" class="profile-img">

<!-- Update CV link -->
<a href="Ahmed_Ali.pdf" class="btn btn-primary" target="_blank">
    <i class="fas fa-download"></i> Download CV
</a>
```

### Project Images
Replace the project images:
- `A11.jpeg` - Data Analysis Project
- `A2.jpeg` - Web Application
- `A3.jpeg` - AI Project

### Skills
Update the skills section in `index.html`:

```html
<div class="skill-item">
    <i class="fab fa-python"></i>
    <span>Python</span>
</div>
```

### Contact Information
Update contact details in `index.html`:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>
```

### Colors and Styling
Customize colors in `styles.css`:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #e74c3c;
    --text-color: #2c3e50;
    --background-color: #f8f9fa;
}
```

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## 📧 Contact Form

The contact form includes:
- Form validation
- Success/error notifications
- Responsive design
- Accessibility features

**Note**: The form currently shows a success message. To make it functional, you'll need to:
1. Set up a backend service (e.g., Formspree, Netlify Forms)
2. Update the form action and method
3. Handle form submission on the server

## 🚀 Deployment | النشر

### GitHub Pages
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be deployed automatically
3. Get a custom domain if needed

### Vercel
1. Connect your GitHub repository
2. Deploy automatically on push
3. Get a custom domain

## 🔧 Advanced Customization | التخصيص المتقدم

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add CSS styles in `styles.css`
3. Add JavaScript functionality in `script.js`

### Custom Animations
Add new keyframes in `styles.css`:

```css
@keyframes customAnimation {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}
```

### Performance Optimization
- Optimize images (use WebP format)
- Minify CSS and JavaScript
- Enable Gzip compression
- Use CDN for external resources

## 📊 SEO Optimization | تحسين محركات البحث

The website includes:
- Semantic HTML structure
- Meta tags
- Alt text for images
- Proper heading hierarchy
- Fast loading times

## ♿ Accessibility | سهولة الوصول

- Keyboard navigation support
- Screen reader compatibility
- High contrast colors
- Focus indicators
- Semantic HTML

## 🐛 Troubleshooting | حل المشاكل

### Common Issues | المشاكل الشائعة

1. **Images not loading**
   - Check file paths
   - Ensure image files exist
   - Verify file permissions

2. **Styles not applying**
   - Check CSS file path
   - Clear browser cache
   - Verify CSS syntax

3. **JavaScript not working**
   - Check browser console for errors
   - Verify JavaScript file path
   - Ensure no syntax errors

### Debug Mode | وضع التصحيح
Enable debug mode by adding this to your browser console:

```javascript
localStorage.setItem('debug', 'true');
```

## 🤝 Contributing | المساهمة

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License | الترخيص

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments | الشكر والتقدير

- Font Awesome for icons
- Google Fonts for typography
- CSS Grid and Flexbox for layout
- Modern CSS features for animations

## 📞 Support | الدعم

If you need help or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Contact the maintainer

---

**Made by Ahmed Ali**

*This portfolio template is designed to showcase your skills and projects professionally. Customize it to match your personal brand and style.*
