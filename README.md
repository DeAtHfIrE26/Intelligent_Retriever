<!-- Custom CSS styling for enhanced GitHub markdown -->
<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shine {
    0% { background-position: -100px; }
    100% { background-position: 200px; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 1.2s ease-out forwards;
  }
  
  .animate-shine {
    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
    background-size: 200px 100%;
    animation: shine 2s infinite linear;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .shadow-glow {
    box-shadow: 0 0 15px rgba(66, 153, 225, 0.5);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #4F46E5, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  }
  
  .neon-border {
    box-shadow: 0 0 5px #4F46E5, 0 0 10px #4F46E5, 0 0 15px #4F46E5;
    border: 1px solid #4F46E5;
  }
</style>

<!-- DYNAMIC HERO SECTION -->
<div align="center">
  <div class="animate-float">
    <img src="generated-icon.png" alt="Intelligent Retriever Logo" width="220" style="filter: drop-shadow(0 0 15px rgba(79, 70, 229, 0.6));">
  </div>
  
  <h1 class="gradient-text" style="font-size: 3.5rem; letter-spacing: -1px; margin-top: 20px;">Intelligent Retriever</h1>
  
  <div class="glass-card animate-fadeIn" style="max-width: 800px; margin: 0 auto;">
    <p align="center" style="font-size: 1.2rem; line-height: 1.6; color: #334155;">
      A state-of-the-art document retrieval system with advanced AI capabilities, designed for enterprises seeking unparalleled search performance and intelligent document management
    </p>
  </div>

  <div style="margin: 30px 0;">
    <a href="#features" class="neon-border animate-pulse" style="display: inline-block; padding: 10px 20px; border-radius: 6px; margin: 0 10px; text-decoration: none; color: #4F46E5; font-weight: bold; transition: all 0.3s ease;">
      <span style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        Explore Features
      </span>
    </a>
    <a href="#installation" style="display: inline-block; padding: 10px 20px; border-radius: 6px; margin: 0 10px; text-decoration: none; color: #334155; border: 1px solid #E2E8F0; font-weight: bold; transition: all 0.3s ease;">
      <span style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707L9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.5 8.5a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1h-1.5zm2.5 0a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H9zm-3 1a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H6zm2.5 0a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H8.5zm-3 1a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H5.5zm2.5 0a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H8z"/>
        </svg>
        Installation
      </span>
    </a>
    <a href="#contributing" style="display: inline-block; padding: 10px 20px; border-radius: 6px; margin: 0 10px; text-decoration: none; color: #334155; border: 1px solid #E2E8F0; font-weight: bold; transition: all 0.3s ease;">
      <span style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
        </svg>
        Contributing
      </span>
    </a>
  </div>

  <!-- Tech Stack Badges with hover effects -->
  <div style="margin: 40px 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
    <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
    <a href="https://orm.drizzle.team/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/Drizzle_ORM-4285F4?style=for-the-badge&logo=postgresql&logoColor=white" alt="Drizzle ORM" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
    <a href="https://openai.com/" target="_blank" rel="noopener noreferrer" style="text-decoration: none; transition: all 0.3s ease; transform: translateY(0); display: inline-block;">
      <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" style="border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    </a>
  </div>

  <!-- Dynamic stats visualization -->
  <div style="margin: 40px auto; display: flex; justify-content: center; gap: 40px; max-width: 800px;">
    <div class="glass-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; width: 180px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4F46E5" viewBox="0 0 16 16">
        <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
      </svg>
      <h3 style="margin: 10px 0; color: #4F46E5;">99.9%</h3>
      <p style="margin: 0; font-size: 0.9rem; color: #64748B;">Retrieval Accuracy</p>
    </div>
    <div class="glass-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; width: 180px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#06B6D4" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 7.5a.5.5 0 0 1 0 1H2.95a2.5 2.5 0 0 1 4.9 0H6.5a.5.5 0 0 1 0-1h2.05a2.5 2.5 0 0 1 4.9 0H12.5a.5.5 0 0 1 0 1h1.45a2.5 2.5 0 0 1-4.9 0H10.5a.5.5 0 0 1 0-1H8.05a2.5 2.5 0 0 1-4.9 0H4.5z"/>
      </svg>
      <h3 style="margin: 10px 0; color: #06B6D4;">150ms</h3>
      <p style="margin: 0; font-size: 0.9rem; color: #64748B;">Avg Response Time</p>
    </div>
    <div class="glass-card" style="display: flex; flex-direction: column; align-items: center; padding: 20px; width: 180px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#EC4899" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>
      <h3 style="margin: 10px 0; color: #EC4899;">8M+</h3>
      <p style="margin: 0; font-size: 0.9rem; color: #64748B;">Documents Indexed</p>
    </div>
  </div>
</div>

<br>

## <span class="gradient-text">🌟 Overview</span>

<div class="glass-card" style="margin: 20px 0; padding: 30px; position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%); border-radius: 50%;"></div>
  <div style="position: absolute; bottom: -30px; left: -30px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%); border-radius: 50%;"></div>

  <p style="font-size: 1.1rem; line-height: 1.8; color: #334155; margin-bottom: 20px;">
    <strong>Intelligent Retriever</strong> is a revolutionary document retrieval system designed to transform how organizations manage, search, and utilize their document repositories. Built on a foundation of cutting-edge AI models and modern web technologies, it delivers exceptional search performance with unparalleled accuracy.
  </p>
  
  <p style="font-size: 1.1rem; line-height: 1.8; color: #334155; margin-bottom: 0;">
    Unlike traditional search systems that rely solely on keyword matching, Intelligent Retriever employs sophisticated semantic understanding to grasp the context and intent behind search queries. This allows it to surface relevant documents even when exact keyword matches aren't present, dramatically improving information discovery and employee productivity.
  </p>
</div>

<div align="center">
  <div class="animate-float" style="margin: 40px 0;">
    <video width="800" autoplay loop muted style="border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
      <source src="https://github.com/DeAtHfIrE26/Intelligent_Retriever/raw/main/attached_assets/demo-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p style="margin-top: 12px; font-size: 0.9rem; color: #64748B;">Intelligent Retriever in action</p>
  </div>
</div>

<div style="display: flex; justify-content: center; margin: 50px 0;">
  <div style="background: linear-gradient(90deg, #4F46E5, #06B6D4); height: 4px; width: 150px; border-radius: 2px;"></div>
</div>

## <span class="gradient-text">✨ Features</span>

<div class="glass-card" style="margin: 30px 0;">
  <!-- Feature grid layout -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 30px;">
    
    <!-- Advanced Retrieval Engine -->
    <div class="feature-card" style="border-radius: 12px; border: 1px solid rgba(226, 232, 240, 0.6); padding: 30px; transition: all 0.3s ease; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #4F46E5, #06B6D4);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(79, 70, 229, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F46E5" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
        <h3 style="margin: 0; font-size: 1.5rem; color: #1E293B;">Advanced Retrieval Engine</h3>
      </div>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(79, 70, 229, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#4F46E5" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Semantic Search</strong>
            <span style="color: #64748B; font-size: 0.9rem;">AI-powered contextual understanding using OpenAI API</span>
          </div>
        </li>
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(79, 70, 229, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#4F46E5" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Hybrid Search</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Combined keyword-based and semantic search for optimal results</span>
          </div>
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(79, 70, 229, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#4F46E5" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Natural Language Querying</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Search using conversational language</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Intelligent Storage & Management -->
    <div class="feature-card" style="border-radius: 12px; border: 1px solid rgba(226, 232, 240, 0.6); padding: 30px; transition: all 0.3s ease; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #06B6D4, #8B5CF6);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(6, 182, 212, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#06B6D4" viewBox="0 0 16 16">
            <path d="M4.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM3.75 1h8.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0 1 12.25 8h-8.5A1.75 1.75 0 0 1 2 6.25v-3.5C2 1.784 2.784 1 3.75 1zM3.75 2.5a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.25.25 0 0 0-.25-.25h-8.5zM3.75 8h8.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-3.5C2 8.784 2.784 8 3.75 8zm0 1.5a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.25.25 0 0 0-.25-.25h-8.5z"/>
          </svg>
        </div>
        <h3 style="margin: 0; font-size: 1.5rem; color: #1E293B;">Intelligent Storage</h3>
      </div>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#06B6D4" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Advanced Document Organization</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Categorize and tag documents with AI assistance</span>
          </div>
        </li>
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#06B6D4" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Version Control</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Track changes and maintain document history</span>
          </div>
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#06B6D4" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Real-Time Synchronization</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Instant updates across all connected clients</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Analytics & Insights -->
    <div class="feature-card" style="border-radius: 12px; border: 1px solid rgba(226, 232, 240, 0.6); padding: 30px; transition: all 0.3s ease; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #8B5CF6, #EC4899);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8B5CF6" viewBox="0 0 16 16">
            <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
          </svg>
        </div>
        <h3 style="margin: 0; font-size: 1.5rem; color: #1E293B;">Analytics & Insights</h3>
      </div>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(139, 92, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8B5CF6" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Usage Metrics</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Detailed analytics on search patterns and document usage</span>
          </div>
        </li>
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(139, 92, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8B5CF6" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Performance Monitoring</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Track system health and request metrics</span>
          </div>
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(139, 92, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8B5CF6" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Custom Reports</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Generate insights tailored to your needs</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- Security & Access Control -->
    <div class="feature-card" style="border-radius: 12px; border: 1px solid rgba(226, 232, 240, 0.6); padding: 30px; transition: all 0.3s ease; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #EC4899, #F59E0B);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(236, 72, 153, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#EC4899" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
          </svg>
        </div>
        <h3 style="margin: 0; font-size: 1.5rem; color: #1E293B;">Security & Access Control</h3>
      </div>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(236, 72, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#EC4899" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Role-Based Access</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Granular permission control for users and groups</span>
          </div>
        </li>
        <li style="display: flex; align-items: center; margin-bottom: 16px;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(236, 72, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#EC4899" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Data Encryption</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Secure storage with encryption at rest and in transit</span>
          </div>
        </li>
        <li style="display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 24px; background: rgba(236, 72, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#EC4899" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </span>
          <div>
            <strong style="display: block; color: #334155;">Audit Trails</strong>
            <span style="color: #64748B; font-size: 0.9rem;">Comprehensive logs for all system activities</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- More Features Button -->
    <div style="grid-column: 1 / -1; margin-top: 20px; text-align: center;">
      <button class="animate-pulse" style="background: linear-gradient(90deg, #4F46E5, #06B6D4); color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Explore More Features
      </button>
    </div>
  </div>
</div>

<div style="display: flex; justify-content: center; margin: 50px 0;">
  <div style="background: linear-gradient(90deg, #4F46E5, #06B6D4); height: 4px; width: 150px; border-radius: 2px;"></div>
</div>

## <span class="gradient-text">🖥️ Tech Stack</span>

<div class="glass-card" style="margin: 30px 0; position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
  
  <!-- Frontend Tech -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #4F46E5; display: flex; align-items: center; gap: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
      </svg>
      Frontend
    </h3>
    <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(79, 70, 229, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width="24" height="24" style="margin-right: 10px;" alt="React">
        <div>
          <strong style="display: block; color: #1E293B;">React</strong>
          <span style="color: #64748B; font-size: 0.8rem;">UI framework</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(79, 70, 229, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://raw.githubusercontent.com/github/explore/882462b8ecc71fd7a3d7fc969f3b92162e5d990a/topics/tailwind/tailwind.png" width="24" height="24" style="margin-right: 10px;" alt="TailwindCSS">
        <div>
          <strong style="display: block; color: #1E293B;">TailwindCSS</strong>
          <span style="color: #64748B; font-size: 0.8rem;">CSS framework</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(79, 70, 229, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://avatars.githubusercontent.com/u/75042455" width="24" height="24" style="margin-right: 10px;" alt="Radix UI">
        <div>
          <strong style="display: block; color: #1E293B;">Radix UI</strong>
          <span style="color: #64748B; font-size: 0.8rem;">Component primitives</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(79, 70, 229, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://avatars.githubusercontent.com/u/42876?s=200&v=4" width="24" height="24" style="margin-right: 10px;" alt="Framer Motion">
        <div>
          <strong style="display: block; color: #1E293B;">Framer Motion</strong>
          <span style="color: #64748B; font-size: 0.8rem;">Animation library</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Backend Tech -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #06B6D4; display: flex; align-items: center; gap: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
      </svg>
      Backend
    </h3>
    <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(6, 182, 212, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" width="24" height="24" style="margin-right: 10px;" alt="Express.js">
        <div>
          <strong style="display: block; color: #1E293B;">Express.js</strong>
          <span style="color: #64748B; font-size: 0.8rem;">Web framework</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(6, 182, 212, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://avatars.githubusercontent.com/u/108468352" width="24" height="24" style="margin-right: 10px;" alt="Drizzle ORM">
        <div>
          <strong style="display: block; color: #1E293B;">Drizzle ORM</strong>
          <span style="color: #64748B; font-size: 0.8rem;">TypeScript ORM</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(6, 182, 212, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" width="24" height="24" style="margin-right: 10px;" alt="PostgreSQL">
        <div>
          <strong style="display: block; color: #1E293B;">PostgreSQL</strong>
          <span style="color: #64748B; font-size: 0.8rem;">Database</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 10px 15px; border-radius: 8px; background: rgba(6, 182, 212, 0.1); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <img src="https://avatars.githubusercontent.com/u/14957082" width="24" height="24" style="margin-right: 10px;" alt="OpenAI">
        <div>
          <strong style="display: block; color: #1E293B;">OpenAI API</strong>
          <span style="color: #64748B; font-size: 0.8rem;">AI capabilities</span>
        </div>
      </div>
    </div>
  </div>
</div>

## <span class="gradient-text">🚀 Installation</span>

<div class="glass-card" style="margin: 30px 0; position: relative;">
  <div style="position: absolute; top: -30px; left: -30px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>

  <div style="background: rgba(17, 24, 39, 0.8); border-radius: 8px; padding: 20px; margin-bottom: 25px; position: relative;">
    <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 5px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #EC4899;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #F59E0B;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #10B981;"></div>
    </div>
    <pre style="margin-top: 15px; color: #E5E7EB; font-family: monospace; overflow-x: auto;"><code><span style="color: #10B981;"># Clone the repository</span>
git clone https://github.com/DeAtHfIrE26/Intelligent_Retriever.git
cd Intelligent_Retriever

<span style="color: #10B981;"># Install dependencies</span>
npm install

<span style="color: #10B981;"># Set up environment variables</span>
cp .env.example .env
<span style="color: #9CA3AF;"># Edit .env with your configuration</span>

<span style="color: #10B981;"># Initialize the database</span>
npm run db:push

<span style="color: #10B981;"># Start the development server</span>
npm run dev</code></pre>
  </div>

  <div style="display: flex; align-items: center; gap: 15px; margin: 20px 0; padding: 15px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10B981;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10B981" viewBox="0 0 16 16">
      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
    </svg>
    <div>
      <p style="margin: 0; color: #10B981; font-weight: bold;">Access the Application</p>
      <p style="margin: 5px 0 0 0; color: #1E293B;">Visit <code style="background: rgba(16, 185, 129, 0.1); padding: 2px 5px; border-radius: 4px;">http://localhost:5000</code> in your browser to see the application in action.</p>
    </div>
  </div>
</div>

## <span class="gradient-text">🔧 Configuration</span>

<div class="glass-card" style="margin: 30px 0;">
  <div style="background: rgba(17, 24, 39, 0.8); border-radius: 8px; padding: 20px; position: relative;">
    <div style="position: absolute; top: 10px; left: 10px; display: flex; gap: 5px;">
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #EC4899;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #F59E0B;"></div>
      <div style="width: 12px; height: 12px; border-radius: 50%; background-color: #10B981;"></div>
    </div>
    <pre style="margin-top: 15px; color: #E5E7EB; font-family: monospace; overflow-x: auto;"><code>DATABASE_URL=postgresql://username:password@localhost:5432/intelligent_retriever
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_secure_session_secret</code></pre>
  </div>
</div>

<div style="display: flex; justify-content: center; margin: 50px 0;">
  <div style="background: linear-gradient(90deg, #4F46E5, #06B6D4); height: 4px; width: 150px; border-radius: 2px;"></div>
</div>

## <span class="gradient-text">📖 API Documentation</span>

<div class="glass-card" style="margin: 30px 0; position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50px; left: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
  
  <p style="color: #1E293B; margin-bottom: 25px;">
    The Intelligent Retriever comes with a comprehensive API that allows you to integrate its powerful features into your existing systems. Our RESTful API provides endpoints for all core functionalities, including authentication, document management, and analytics.
  </p>
  
  <!-- API Explorer Interface -->
  <div style="background: rgba(17, 24, 39, 0.8); border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
    <!-- API Explorer Header -->
    <div style="background: rgba(0, 0, 0, 0.3); padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10B981" viewBox="0 0 16 16">
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <span style="color: #E5E7EB; font-weight: bold;">API Explorer</span>
      </div>
      <div>
        <span style="color: #9CA3AF; font-size: 0.8rem;">v1.0.0</span>
      </div>
    </div>
    
    <!-- API Tabs -->
    <div style="display: flex; background: rgba(0, 0, 0, 0.2); border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <div style="padding: 12px 20px; color: #10B981; border-bottom: 2px solid #10B981; font-weight: bold;">Authentication</div>
      <div style="padding: 12px 20px; color: #9CA3AF;">Documents</div>
      <div style="padding: 12px 20px; color: #9CA3AF;">Analytics</div>
    </div>
    
    <!-- API Endpoints -->
    <div style="padding: 20px;">
      <!-- Endpoint 1 -->
      <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="display: flex; justify-content: space-between; padding: 12px 15px; background: rgba(0, 0, 0, 0.2);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #EC4899; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">POST</span>
            <code style="color: #E5E7EB;">/api/auth/login</code>
          </div>
          <div>
            <span style="background: rgba(16, 185, 129, 0.2); color: #10B981; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">User login</span>
          </div>
        </div>
        <div style="padding: 15px; color: #9CA3AF; font-size: 0.9rem;">
          Authenticates a user and returns a session token
        </div>
      </div>
      
      <!-- Endpoint 2 -->
      <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="display: flex; justify-content: space-between; padding: 12px 15px; background: rgba(0, 0, 0, 0.2);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #EC4899; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">POST</span>
            <code style="color: #E5E7EB;">/api/auth/logout</code>
          </div>
          <div>
            <span style="background: rgba(16, 185, 129, 0.2); color: #10B981; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">User logout</span>
          </div>
        </div>
        <div style="padding: 15px; color: #9CA3AF; font-size: 0.9rem;">
          Invalidates the current session token
        </div>
      </div>
      
      <!-- Endpoint 3 -->
      <div style="border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="display: flex; justify-content: space-between; padding: 12px 15px; background: rgba(0, 0, 0, 0.2);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #3B82F6; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">GET</span>
            <code style="color: #E5E7EB;">/api/auth/session</code>
          </div>
          <div>
            <span style="background: rgba(16, 185, 129, 0.2); color: #10B981; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">Session info</span>
          </div>
        </div>
        <div style="padding: 15px; color: #9CA3AF; font-size: 0.9rem;">
          Returns information about the current session
        </div>
      </div>
    </div>
  </div>
  
  <div style="display: flex; justify-content: center; margin: 30px 0;">
    <a href="#" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(90deg, #4F46E5, #06B6D4); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: all 0.3s ease;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
      </svg>
      View Full API Documentation
    </a>
  </div>
</div>

## <span class="gradient-text">📊 Dashboard</span>

<div class="glass-card" style="margin: 30px 0; position: relative; overflow: hidden;">
  <div style="position: absolute; bottom: -50px; right: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
  
  <p style="color: #1E293B; margin-bottom: 25px;">
    The Intelligent Retriever features a powerful dashboard providing insights into your document ecosystem. Monitor usage patterns, track system performance, and gain valuable insights into user behavior.
  </p>
  
  <div class="animate-float" style="margin: 30px 0; position: relative;">
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; box-shadow: 0 0 25px rgba(79, 70, 229, 0.4); pointer-events: none;"></div>
    <img src="https://github.com/DeAtHfIrE26/Intelligent_Retriever/raw/main/attached_assets/dashboard.png" alt="Dashboard Screenshot" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
  </div>
  
  <!-- Dashboard Features -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 30px;">
    <div style="background: rgba(79, 70, 229, 0.1); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; text-align: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F46E5" viewBox="0 0 16 16" style="margin-bottom: 15px;">
        <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
      </svg>
      <h3 style="color: #4F46E5; margin: 0 0 10px 0;">Real-time Metrics</h3>
      <p style="color: #64748B; margin: 0; font-size: 0.9rem;">Monitor system performance and usage in real-time</p>
    </div>
    
    <div style="background: rgba(6, 182, 212, 0.1); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; text-align: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#06B6D4" viewBox="0 0 16 16" style="margin-bottom: 15px;">
        <path d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
      </svg>
      <h3 style="color: #06B6D4; margin: 0 0 10px 0;">Trend Analysis</h3>
      <p style="color: #64748B; margin: 0; font-size: 0.9rem;">Identify patterns and trends in document usage</p>
    </div>
    
    <div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; text-align: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8B5CF6" viewBox="0 0 16 16" style="margin-bottom: 15px;">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      </svg>
      <h3 style="color: #8B5CF6; margin: 0 0 10px 0;">User Insights</h3>
      <p style="color: #64748B; margin: 0; font-size: 0.9rem;">Understand how users interact with your documents</p>
    </div>
    
    <div style="background: rgba(236, 72, 153, 0.1); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; text-align: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#EC4899" viewBox="0 0 16 16" style="margin-bottom: 15px;">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
      <h3 style="color: #EC4899; margin: 0 0 10px 0;">Custom Reports</h3>
      <p style="color: #64748B; margin: 0; font-size: 0.9rem;">Generate tailored reports for business insights</p>
    </div>
  </div>
</div>

<div style="display: flex; justify-content: center; margin: 50px 0;">
  <div style="background: linear-gradient(90deg, #4F46E5, #06B6D4); height: 4px; width: 150px; border-radius: 2px;"></div>
</div>

## <span class="gradient-text">🚧 Roadmap</span>

<div class="glass-card" style="margin: 30px 0; position: relative; overflow: hidden;">
  <div style="position: absolute; bottom: -50px; left: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
  
  <p style="color: #1E293B; margin-bottom: 30px;">
    Our development roadmap outlines the exciting features and improvements we have planned for future releases. We're constantly evolving Intelligent Retriever to meet the needs of our users and stay ahead of industry trends.
  </p>
  
  <!-- Timeline visualization -->
  <div style="position: relative; padding-left: 50px; margin-bottom: 50px;">
    <!-- Timeline line -->
    <div style="position: absolute; left: 20px; top: 0; bottom: 0; width: 4px; background: linear-gradient(to bottom, #4F46E5 0%, #EC4899 100%); border-radius: 2px;"></div>
    
    <!-- Feature 1 -->
    <div style="margin-bottom: 40px; position: relative;">
      <div style="position: absolute; left: -50px; width: 40px; height: 40px; border-radius: 50%; background: #4F46E5; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);">
        <span style="color: white; font-weight: bold;">Q3</span>
      </div>
      <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #4F46E5;">
        <h3 style="margin: 0 0 15px 0; color: #4F46E5;">Advanced Document Processing</h3>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">
            <strong>OCR for image-based documents</strong> - Extract text from images and scanned documents
          </li>
          <li>
            <strong>Extract insights from PDFs and complex documents</strong> - Intelligent parsing of structured and unstructured content
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Feature 2 -->
    <div style="margin-bottom: 40px; position: relative;">
      <div style="position: absolute; left: -50px; width: 40px; height: 40px; border-radius: 50%; background: #8B5CF6; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);">
        <span style="color: white; font-weight: bold;">Q4</span>
      </div>
      <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #8B5CF6;">
        <h3 style="margin: 0 0 15px 0; color: #8B5CF6;">Expanded AI Capabilities</h3>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">
            <strong>Document summarization</strong> - Automatically generate concise summaries of long documents
          </li>
          <li style="margin-bottom: 10px;">
            <strong>Sentiment analysis</strong> - Understand the emotional tone of documents
          </li>
          <li>
            <strong>Entity extraction</strong> - Identify and categorize key information in documents
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Feature 3 -->
    <div style="margin-bottom: 40px; position: relative;">
      <div style="position: absolute; left: -50px; width: 40px; height: 40px; border-radius: 50%; background: #EC4899; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);">
        <span style="color: white; font-weight: bold;">Q1</span>
      </div>
      <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #EC4899;">
        <h3 style="margin: 0 0 15px 0; color: #EC4899;">Enhanced Collaboration</h3>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">
            <strong>Real-time collaborative editing</strong> - Edit documents simultaneously with team members
          </li>
          <li>
            <strong>Comment and annotation features</strong> - Add feedback directly to documents
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Feature 4 -->
    <div style="position: relative;">
      <div style="position: absolute; left: -50px; width: 40px; height: 40px; border-radius: 50%; background: #F59E0B; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);">
        <span style="color: white; font-weight: bold;">Q2</span>
      </div>
      <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #F59E0B;">
        <h3 style="margin: 0 0 15px 0; color: #F59E0B;">Mobile Applications</h3>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">
            <strong>iOS and Android native apps</strong> - Access your documents on the go
          </li>
          <li>
            <strong>Offline capabilities</strong> - Work with your documents even without internet access
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  <div style="display: flex; justify-content: center; margin-top: 20px;">
    <a href="#" style="display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(90deg, #4F46E5, #06B6D4); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: all 0.3s ease;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      Request a Feature
    </a>
  </div>
</div>

<div style="display: flex; justify-content: center; margin: 50px 0;">
  <div style="background: linear-gradient(90deg, #4F46E5, #06B6D4); height: 4px; width: 150px; border-radius: 2px;"></div>
</div>

## <span class="gradient-text">🤝 Contributing</span>

<div class="glass-card" style="margin: 30px 0; position: relative; overflow: hidden;">
  <div style="position: absolute; top: -30px; right: -30px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%); border-radius: 50%;"></div>
  
  <p style="color: #1E293B; margin-bottom: 25px;">
    Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make to Intelligent Retriever are <strong>greatly appreciated</strong>.
  </p>
  
  <!-- Contribution steps -->
  <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0;">
    <!-- Step 1 -->
    <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(to bottom, #4F46E5, #06B6D4);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(79, 70, 229, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <span style="color: #4F46E5; font-weight: bold; font-size: 1.2rem;">1</span>
        </div>
        <h3 style="margin: 0; color: #1E293B;">Fork the Project</h3>
      </div>
      <p style="color: #64748B; margin: 0; padding-left: 55px;">
        Create your own copy of the repository to work on.
      </p>
    </div>
    
    <!-- Step 2 -->
    <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(to bottom, #06B6D4, #8B5CF6);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(6, 182, 212, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <span style="color: #06B6D4; font-weight: bold; font-size: 1.2rem;">2</span>
        </div>
        <h3 style="margin: 0; color: #1E293B;">Create a Branch</h3>
      </div>
      <p style="color: #64748B; margin: 0; padding-left: 55px;">
        <code style="background: rgba(6, 182, 212, 0.1); padding: 2px 5px; border-radius: 4px; font-size: 0.9rem;">git checkout -b feature/AmazingFeature</code>
      </p>
    </div>
    
    <!-- Step 3 -->
    <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(to bottom, #8B5CF6, #EC4899);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(139, 92, 246, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <span style="color: #8B5CF6; font-weight: bold; font-size: 1.2rem;">3</span>
        </div>
        <h3 style="margin: 0; color: #1E293B;">Commit Changes</h3>
      </div>
      <p style="color: #64748B; margin: 0; padding-left: 55px;">
        <code style="background: rgba(139, 92, 246, 0.1); padding: 2px 5px; border-radius: 4px; font-size: 0.9rem;">git commit -m 'Add some AmazingFeature'</code>
      </p>
    </div>
    
    <!-- Step 4 -->
    <div style="flex: 1; min-width: 250px; background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; width: 6px; height: 100%; background: linear-gradient(to bottom, #EC4899, #F59E0B);"></div>
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(236, 72, 153, 0.1); display: flex; align-items: center; justify-content: center; margin-right: 15px;">
          <span style="color: #EC4899; font-weight: bold; font-size: 1.2rem;">4</span>
        </div>
        <h3 style="margin: 0; color: #1E293B;">Push & Submit PR</h3>
      </div>
      <p style="color: #64748B; margin: 0; padding-left: 55px;">
        Push to your branch and open a pull request to the main repository.
      </p>
    </div>
  </div>
  
  <!-- Contribution guidelines -->
  <div style="background: rgba(16, 185, 129, 0.1); border-radius: 8px; padding: 20px; margin-top: 30px; border-left: 4px solid #10B981;">
    <h3 style="margin: 0 0 15px 0; color: #10B981; display: flex; align-items: center; gap: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
      Contribution Guidelines
    </h3>
    <ul style="padding-left: 20px; margin: 0; color: #334155;">
      <li style="margin-bottom: 8px;">Ensure your code follows the project's style guidelines</li>
      <li style="margin-bottom: 8px;">Write clear, descriptive commit messages</li>
      <li style="margin-bottom: 8px;">Add tests for new features when possible</li>
      <li>Update documentation to reflect any changes</li>
    </ul>
  </div>
</div>

## <span class="gradient-text">📄 License</span>

<div class="glass-card" style="margin: 30px 0; padding: 30px;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#64748B" viewBox="0 0 16 16">
      <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
    </svg>
    <p style="margin: 0; color: #334155; font-size: 1.1rem;">
      Distributed under the <strong>MIT License</strong>. See <code style="background: rgba(100, 116, 139, 0.1); padding: 2px 5px; border-radius: 4px;">LICENSE</code> for more information.
    </p>
  </div>
</div>

## <span class="gradient-text">✉️ Contact</span>

<div class="glass-card" style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: center;">
    <a href="https://github.com/DeAtHfIrE26/Intelligent_Retriever" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #4F46E5; font-weight: bold; background: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: all 0.3s ease;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      GitHub Project
    </a>
    
## ✉️ Contact

Project Link: [https://github.com/DeAtHfIrE26/Intelligent_Retriever](https://github.com/DeAtHfIrE26/Intelligent_Retriever)

---

<div align="center">
  <p>
    <a href="https://github.com/DeAtHfIrE26/Intelligent_Retriever/stargazers">
      <img src="https://img.shields.io/github/stars/DeAtHfIrE26/Intelligent_Retriever?style=social" alt="Stars" />
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/DeAtHfIrE26/Intelligent_Retriever/network/members">
      <img src="https://img.shields.io/github/forks/DeAtHfIrE26/Intelligent_Retriever?style=social" alt="Forks" />
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/DeAtHfIrE26/Intelligent_Retriever/issues">
      <img src="https://img.shields.io/github/issues/DeAtHfIrE26/Intelligent_Retriever?style=social" alt="Issues" />
    </a>
  </p>
  
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" />
</div> 