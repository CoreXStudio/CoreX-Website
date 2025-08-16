// Global Search Functionality for Corex Studio Website
// This script provides search functionality across all pages

// Search data - defines what can be searched and where it leads
const searchData = {
  // Downloads
  'corex editor': { page: 'download page.html', section: 'downloads', description: 'Collaborative code editor for teams' },
  'minecraft autoclaimer': { page: 'download page.html', section: 'downloads', description: 'Automatically claim Minecraft rewards' },
  'epic games autoclaimer': { page: 'download page.html', section: 'downloads', description: 'Automatically claim free games from Epic Games' },
  'chatbox': { page: 'download page.html', section: 'downloads', description: 'Real-time chat for your team' },
  'download': { page: 'download page.html', section: 'downloads', description: 'Download Center - Get the latest releases' },
  'downloads': { page: 'download page.html', section: 'downloads', description: 'Download Center - Get the latest releases' },
  
  // FAQ
  'faq': { page: 'FAQ.html', section: 'faq', description: 'Frequently Asked Questions' },
  'questions': { page: 'FAQ.html', section: 'faq', description: 'Frequently Asked Questions' },
  'help': { page: 'FAQ.html', section: 'faq', description: 'Frequently Asked Questions' },
  
  // Support
  'support': { page: 'https://discord.gg/Vv3ZMEXh6c', section: 'support', description: 'Get help via Discord' },
  'discord': { page: 'https://discord.gg/Vv3ZMEXh6c', section: 'support', description: 'Join our Discord community' },
  
  // Social
  'social': { page: 'Socials.html', section: 'social', description: 'Connect with us on social media' },
  'socials': { page: 'Socials.html', section: 'social', description: 'Connect with us on social media' },
  'contact': { page: 'Socials.html', section: 'social', description: 'Connect with us on social media' },
  
  // Home
  'home': { page: 'index.html', section: 'home', description: 'Welcome to Corex Studio' },
  'main': { page: 'index.html', section: 'home', description: 'Welcome to Corex Studio' },
  'welcome': { page: 'index.html', section: 'home', description: 'Welcome to Corex Studio' },
  
  // General terms
  'corex': { page: 'index.html', section: 'home', description: 'Corex Studio - Developer Tools' },
  'studio': { page: 'index.html', section: 'home', description: 'Corex Studio - Developer Tools' },
  'tools': { page: 'download page.html', section: 'downloads', description: 'Developer tools and software' },
  'software': { page: 'download page.html', section: 'downloads', description: 'Developer tools and software' }
};

// Function to perform global search
function performGlobalSearch() {
  const searchInput = document.getElementById('software-search');
  if (!searchInput) return;
  
  const query = searchInput.value.toLowerCase().trim();
  
  if (query === '') {
    showSearchResults([]);
    return;
  }
  
  // Find matching results
  const results = [];
  
  // Direct matches
  for (const [key, data] of Object.entries(searchData)) {
    if (key.includes(query) || query.includes(key)) {
      results.push({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        description: data.description,
        page: data.page,
        section: data.section,
        matchType: 'exact'
      });
    }
  }
  
  // Partial matches
  for (const [key, data] of Object.entries(searchData)) {
    if (key.includes(query) && !results.find(r => r.title.toLowerCase() === key)) {
      results.push({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        description: data.description,
        page: data.page,
        section: data.section,
        matchType: 'partial'
      });
    }
  }
  
  // Sort results (exact matches first, then alphabetical)
  results.sort((a, b) => {
    if (a.matchType === 'exact' && b.matchType !== 'exact') return -1;
    if (b.matchType === 'exact' && a.matchType !== 'exact') return 1;
    return a.title.localeCompare(b.title);
  });
  
  showSearchResults(results);
}

// Function to show search results
function showSearchResults(results) {
  // Remove existing results dropdown
  const existingDropdown = document.getElementById('search-results-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
  }
  
  if (results.length === 0) {
    return;
  }
  
  // Create results dropdown
  const dropdown = document.createElement('div');
  dropdown.id = 'search-results-dropdown';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 5px;
  `;
  
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.style.cssText = `
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    resultItem.innerHTML = `
      <div style="font-weight: bold; color: #007bff; margin-bottom: 4px;">${result.title}</div>
      <div style="font-size: 0.9em; color: #666;">${result.description}</div>
      <div style="font-size: 0.8em; color: #999; margin-top: 2px;">${result.page}</div>
    `;
    
    resultItem.addEventListener('mouseenter', () => {
      resultItem.style.backgroundColor = '#f8f9fa';
    });
    
    resultItem.addEventListener('mouseleave', () => {
      resultItem.style.backgroundColor = 'white';
    });
    
    resultItem.addEventListener('click', () => {
      navigateToResult(result);
    });
    
    dropdown.appendChild(resultItem);
  });
  
  // Add to search box container
  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    searchBox.style.position = 'relative';
    searchBox.appendChild(dropdown);
  }
}

// Function to navigate to search result
function navigateToResult(result) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (result.page === currentPage) {
    // Same page - scroll to section if it exists
    const section = document.querySelector(`[data-section="${result.section}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Different page - navigate with section parameter
    const url = `${result.page}${result.section ? `#${result.section}` : ''}`;
    window.location.href = url;
  }
  
  // Clear search and hide results
  const searchInput = document.getElementById('software-search');
  if (searchInput) {
    searchInput.value = '';
  }
  
  const dropdown = document.getElementById('search-results-dropdown');
  if (dropdown) {
    dropdown.remove();
  }
}

// Function to handle page load and scroll to sections
function handlePageLoad() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    setTimeout(() => {
      const section = document.querySelector(`[data-section="${hash}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}

// Initialize search functionality
function initializeGlobalSearch() {
  const searchInput = document.getElementById('software-search');
  if (searchInput) {
    // Add event listeners
    searchInput.addEventListener('input', performGlobalSearch);
    searchInput.addEventListener('focus', performGlobalSearch);
    
    // Handle search button click
    const searchButton = searchInput.nextElementSibling;
    if (searchButton) {
      searchButton.addEventListener('click', performGlobalSearch);
    }
    
    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performGlobalSearch();
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        const dropdown = document.getElementById('search-results-dropdown');
        if (dropdown) {
          dropdown.remove();
        }
      }
    });
  }
  
  // Handle page load
  handlePageLoad();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGlobalSearch);
} else {
  initializeGlobalSearch();
} 