const fs = require("fs");

const content = `
# Quiz App 

A simple and modern quiz app for students to practice and test their skills.  
Built with care by **Vasu Tripathi**.
---

##  What it does
- Multiple quiz categories: Quants, Aptitude, Numericals, Programming, and more
- Choose difficulty: Easy, Medium, Hard
- Timer for each question
- Randomized questions every time
- Review your answers after finishing
- Quiz history to check your past scores
- Works smoothly on mobile and desktop
- Admin panel (local only) to add or edit questions

---

##  How to run it
1. Clone this repo  
   
   git clone https://github.com/VasuTripathi/Quiz-App.git
   cd Quiz-App
   

2. Install everything  
   \`\`\`bash
   npm install
   \`\`\`

3. Start the app  
   
   npm run dev
   
   Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  How to put it online (GitHub Pages)
1. Install gh-pages  
   bash
   npm install gh-pages --save-dev
   

2. Add these scripts to your \`package.json\`  
   json
   "scripts": {
     "deploy": "gh-pages -d dist",
     "predeploy": "npm run build"
   }
   

3. Update \`vite.config.js\` with your repo name  
   js
   export default defineConfig({
     base: "/Quiz-App/",
     plugins: [react()],
   })


4. Deploy  
   
   npm run deploy
   

Your app will be live at:  
[https://VasuTripathi.github.io/Quiz-App/](https://VasuTripathi.github.io/Quiz-App/)


