# Research Agent

An automated web-based research tool that generates comprehensive research documents from user-submitted topics using AI-powered automation workflows.

## 🚀 Features

- **Automated Research Generation**: Submit any research topic and get a comprehensive document
- **Real-time Status Updates**: Track your research progress with live feedback
- **Secure Document Access**: Receive direct links to your generated research documents
- **User-friendly Interface**: Clean, responsive design with intuitive form validation
- **Error Handling**: Robust error management with helpful user feedback
- **Auto-hide Notifications**: Success messages automatically disappear after 10 seconds

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API Integration**: REST API with fetch()
- **Automation**: n8n workflow automation platform
- **Deployment**: Static web hosting compatible

## 📁 Project Structure

```
Research-Agent-main/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── styles.css          # CSS styling
└── README.md           # Project documentation
```

## 🎯 How It Works

1. **Topic Submission**: User enters a research topic in the web form
2. **API Processing**: The application sends the topic to an n8n webhook endpoint
3. **Document Generation**: The n8n workflow processes the request and generates research content
4. **Result Delivery**: User receives a direct link to access the completed research document

## 🚀 Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- n8n webhook endpoint (configured separately)

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd Research-Agent-main
   ```

2. Open `index.html` in your web browser, or serve it using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with live-server)
   npx live-server
   ```

3. Navigate to `http://localhost:8000` (if using a local server)

### Configuration

Update the webhook URL in `script.js`:

```javascript
const webhookUrl = 'https://your-n8n-instance.com/webhook/research';
```

Replace with your actual n8n webhook endpoint.

## 🔧 API Integration

The application expects the n8n webhook to:

**Request Format:**
```json
{
  "Topic Of Research": "Your research topic here"
}
```

**Response Format:**
```json
{
  "documentUrl": "https://link-to-generated-document.com"
}
```

## 💡 Usage

1. Open the application in your web browser
2. Enter your research topic in the input field
3. Click "Generate Research" button
4. Wait for processing (you'll see a loading indicator)
5. Once complete, click the "Open Document" link to view your research

## 🎨 Customization

### Styling
Modify `styles.css` to customize the appearance:
- Colors and themes
- Layout and spacing
- Button and form styling
- Responsive breakpoints

### Functionality
Update `script.js` to:
- Change API endpoints
- Modify form validation rules
- Adjust loading behaviors
- Customize status messages

## 🔒 Security Features

- **CORS Handling**: Proper cross-origin request setup
- **Input Validation**: Client-side topic validation
- **Secure Links**: External document links open in new tabs with security attributes
- **Error Handling**: Safe error message display without exposing sensitive data

## 🐛 Troubleshooting

### Common Issues

**"Failed to submit research request"**
- Check your internet connection
- Verify the webhook URL is correct and accessible
- Ensure the n8n workflow is running

**No response after submission**
- Check browser console for JavaScript errors
- Verify the API endpoint is responding
- Check if the webhook accepts POST requests with JSON payload

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Powered by n8n automation platform
- Designed for seamless user experience

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Happy Researching! 🔍📚**
