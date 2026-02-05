
const fs = require('fs');
const path = require('path');

const README_URL = 'https://raw.githubusercontent.com/VoltAgent/awesome-openclaw-skills/main/README.md';
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/skills.json');

async function fetchAndSave() {
  console.log('Fetching data from GitHub...');
  try {
    const response = await fetch(README_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const text = await response.text();
    const data = parseMarkdown(text);
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    console.log(`Successfully saved data to ${OUTPUT_FILE}`);
    console.log(`Categories found: ${data.categories.length}`);
    console.log(`Total skills: ${data.categories.reduce((acc, c) => acc + c.skills.length, 0)}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  
  const data = {
    introduction: "",
    installation: "",
    about: "",
    categories: []
  };

  let currentSection = 'intro'; 
  let currentCategory = null;
  let buffer = [];

  const headerRegex = /^(#{1,6})\s+(.+)$/;
  const categoryHtmlRegex = /<summary><h3[^>]*>(.+?)<\/h3><\/summary>/;
  const skillRegex = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:-|:|—)?\s*(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(headerRegex);
    const categoryMatch = line.match(categoryHtmlRegex);
    
    // Check for Category in HTML format
    if (categoryMatch) {
        const title = categoryMatch[1].trim();
        currentSection = 'categories';
        currentCategory = {
            name: title,
            skills: []
        };
        data.categories.push(currentCategory);
        continue;
    }

    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      const lowerTitle = title.toLowerCase();

      if (currentSection === 'intro') {
          if (lowerTitle === 'installation' || lowerTitle.includes('install')) {
              data.introduction = buffer.join('\n').trim();
              currentSection = 'installation';
              buffer = [];
              continue;
          }
          if (lowerTitle === 'table of contents' || lowerTitle === 'contents') {
              data.introduction = buffer.join('\n').trim();
              currentSection = 'toc';
              buffer = [];
              continue;
          }
      }

      if (currentSection === 'installation') {
          if (lowerTitle.includes('why this list') || lowerTitle === 'table of contents' || lowerTitle === 'contents') {
              data.installation = buffer.join('\n').trim();
              currentSection = lowerTitle.includes('why') ? 'about' : 'toc';
              buffer = [];
              continue;
          }
      }

      if (currentSection === 'about') {
          if (lowerTitle === 'table of contents' || lowerTitle === 'contents') {
              data.about = buffer.join('\n').trim();
              currentSection = 'toc';
              buffer = [];
              continue;
          }
      }
      
      // Stop capturing categories if we hit footer sections
      if (currentSection === 'categories') {
          if (lowerTitle.includes('contributing') || lowerTitle.includes('license')) {
              currentSection = 'footer';
              currentCategory = null;
              continue;
          }
      }
    }

    // Content Parsing
    if (currentSection === 'categories' && currentCategory) {
        const skillMatch = line.match(skillRegex);
        if (skillMatch) {
            currentCategory.skills.push({
                name: skillMatch[1].trim(),
                url: skillMatch[2].trim(),
                description: skillMatch[3].trim(),
                category: currentCategory.name
            });
        }
    } else if (currentSection !== 'toc' && currentSection !== 'footer') {
        // Don't buffer if we are in categories mode but not matching skills (likely html tags)
        if (currentSection !== 'categories') {
            buffer.push(line);
        }
    }
  }
  
  // Clean up
  // If we ended in a section that needs saving
  if (currentSection === 'intro' && buffer.length > 0) data.introduction = buffer.join('\n').trim();
  // ... other sections usually handled by transitions

  // Filter empty
  data.categories = data.categories.filter(c => c.skills.length > 0);
  
  return data;
}

fetchAndSave();
